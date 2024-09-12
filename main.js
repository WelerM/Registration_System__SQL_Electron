const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

const { Sequelize } = require('sequelize');
const Visitor = require('./models/visitor'); // Adjust the path accordingly


// Initialize Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database/registration_system.sqlite'
});
async function initializeDatabase() {

  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');



  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

//=======================================================================








const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,  // Keep this true for security
      enableRemoteModule: false, // Keep remote module off
      nodeIntegration: false  // Keep this false for security
    }
  })
  win.setMenu(null)
  win.maximize();

  win.webContents.once('did-finish-load', () => {
    win.webContents.openDevTools();
  });


  // =========== REGISTRATION INTERFACE =========//

  //Obj coming from registration form
  ipcMain.handle('insert_data', async (event, data) => {


    try {

      // Define the new user data
      const newUser = {
        name: data.name,
        visitor_id: data.visitor_id,
        visiting_floor: data.visiting_floor,
        visit_purpose: data.visit_purpose,
        created_at: new Date() // or any specific date string
      };


      // Insert the new user into the database
      const createdUser = await Visitor.create(newUser);

      // Log the created user data
      console.log('User created successfully:', createdUser.dataValues);

      // return createdUser.dataValues;
      return { success: true }

    } catch (error) {
      console.error('Error inserting new user:', error);

    }

  })

  //Reassing of guests

  //Reassing of guests
  ipcMain.handle('reassign_visitor', async (event, data) => {

    data = Number(data)

    try {
      // Retrieve the existing user by ID
      const existingUser = await Visitor.findOne({
        where: { id: data }
      });

      if (!existingUser) {
        console.log('User not found with ID:', data.id);
        return;
      }

      // Define the new user data
      const newUser = {
        name: existingUser.name,
        visitor_id: existingUser.visitor_id,
        visiting_floor: existingUser.visiting_floor,
        visit_purpose: existingUser.visit_purpose,
        created_at: new Date() // or any specific date string if needed
      };

      // Create a new user record with the new data
      const createdUser = await Visitor.create(newUser);

      // Log the created user data
      console.log('User reassigned successfully:', createdUser.dataValues);

      // Optionally, you might want to return the created user data
      // event.reply('user_reassigned', createdUser.dataValues);
      // return { success: true }

      console.log('fdgsdg');
      
    } catch (error) {
      console.error('Error reassigning user:', error);
    }
  })




  // ============ SEARCH INTERFACE =============//
  //QUICK SEARCH

  //By name
  ipcMain.on('search_by_name', async (event, data) => {


    let param = data.name
    param = param.toLowerCase();

    let column = 'name'
    let results = await search(param, column)

    results = JSON.stringify(results);

    win.webContents.send("search_by_name_return", results);


  })

  //By doc
  ipcMain.on('search_by_doc', async (event, data) => {

    let param = data
    param = Number(param);

    let column = 'visitor_id'
    let results = await search(param, column)

    results = JSON.stringify(results);

    win.webContents.send("search_by_doc_return", results);

  })

  //SEARCH BY MONTH - Not working
  ipcMain.on('search_by_calendar', async (event, data) => {

    let calendar_obj = data;


    //Pode pesquisar day e month e year
    //Pode pesquisar todos do month e year = 'all'
    //pode pesuisar todos do year (criar na view)

    let day = calendar_obj.day;
    let month = calendar_obj.month;
    let year = calendar_obj.year


    let results = await calendar_search(day, month, year)


    win.webContents.send('search_by_calendar_return', results)
  })




  // Search functions

  async function calendar_search(day, month, year) {

    // Build the date string (YYYY-MM-DD)
    const date_start = new Date(`${year}-${month}-${day}T00:00:00.000Z`);
    const next_day = new Date(`${year}-${month}-${(parseInt(day, 10) + 1).toString().padStart(2, '0')}T00:00:00.000Z`);

    // Set up the `where` condition for the Sequelize query
    const whereCondition = {
      created_at: {
        [Sequelize.Op.gte]: date_start,
        [Sequelize.Op.lt]: next_day
      }
    };

    let users = await Visitor.findAll({
      where: whereCondition
    });

    users = JSON.stringify(users);

    return users;
  }



  async function search(param, column_1) {

    try {
      let whereCondition = {};

      if (column_1 === 'created_at') {

        // Determine the type of search based on the format of `param`
        const isExactDate = /^\d{4}-\d{2}-\d{2}$/.test(param);
        const isMonthYear = /^\d{4}-\d{2}$/.test(param);
        const isYear = /^\d{4}$/.test(param);

        if (isExactDate) {
          // Exact date search
          const dateStart = `${param} 00:00:00.000 +00:00`;
          const dateEnd = `${param} 23:59:59.999 +00:00`;
          whereCondition = {
            [column_1]: {
              [Sequelize.Op.between]: [dateStart, dateEnd]
            }
          };
        } else if (isMonthYear) {
          // Search by month and year
          const [year, month] = param.split('-');
          const dateStart = `${year}-${month}-01 00:00:00.000 +00:00`;
          const nextMonth = (parseInt(month, 10) % 12) + 1;
          const nextYear = nextMonth === 1 ? parseInt(year, 10) + 1 : year;
          const nextMonthStr = nextMonth.toString().padStart(2, '0');
          const dateEnd = `${nextYear}-${nextMonthStr}-01 00:00:00.000 +00:00`;
          whereCondition = {
            [column_1]: {
              [Sequelize.Op.between]: [dateStart, dateEnd]
            }
          };
        } else if (isYear) {
          // Search by year
          const dateStart = `${param}-01-01 00:00:00.000 +00:00`;
          const dateEnd = `${param}-12-31 23:59:59.999 +00:00`;

          whereCondition = {
            [column_1]: {
              [Sequelize.Op.between]: [dateStart, dateEnd]
            }
          };
        } else {
          // Fallback: If the parameter does not match any date format, use a LIKE search
          whereCondition = {
            [column_1]: {
              [Sequelize.Op.like]: `%${param}%`
            }
          };
        }
      } else {
        // For other columns
        whereCondition = {
          [column_1]: {
            [Sequelize.Op.like]: `%${param}%`
          }
        };
      }


      const users = await Visitor.findAll({
        where: whereCondition
      });


      if (users.length > 0) {
        let user = users.map(user => user.dataValues);
        return user;

      } else {
        return [];
      }




    } catch (error) {
      console.error("Error during search:", error);
      throw error;
    }


  }




  // ========= STATISTICS =============//
  //Today entries
  ipcMain.on('today_entries_call', (event, dat) => {
    const obj = dat
    const date = obj.created_at
    obj.created_at = new RegExp(date)

    // db.find(obj, (err, data) => {
    //   win.webContents.send('today_entries_return', data)
    // });
  })

  //Month entries
  ipcMain.on('month_entries_call', (event, data) => {
    function month_entries_return() {
      const obj = data
      const mes = obj.month
      obj.month = new RegExp(mes)
      // db.find(obj.mes, (err, data) => {
      //   win.webContents.send('month_entries_return', data)
      // });
    }
    month_entries_return()
  })

  //All entries
  ipcMain.on('all_data_call', (event, data) => {
    function all_data_return() {
      // db.find({}, (err, data) => {
      //   win.webContents.send('all_data_return', data)
      // });
    }
    all_data_return()
  })
  //===========================================//


  win.loadFile('public/index.html')
}

app.whenReady().then(() => {
  initializeDatabase();
  createWindow()
})



