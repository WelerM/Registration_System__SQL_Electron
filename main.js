const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

const { Sequelize } = require('sequelize');
const Visitor = require('./models/visitor'); // Adjust the path accordingly
const { log } = require('console');
const { type } = require('os');
const { stringify } = require('querystring');

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
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.setMenu(null)
  win.maximize();

  win.webContents.once('did-finish-load', () => {
    win.webContents.openDevTools();
  });


  // =========== REGISTRATION INTERFACE =========//
  
  //Obj coming from registration form
  ipcMain.on('insert_data', async (event, data) => {

    
    try {
  
      // Define the new user data
      const newUser = {
        name: data.name,
        visitor_id: data.visitor_id,
        visiting_floor: data.visiting_floor,
        visit_purpose: data.visit_purpose,
        date: new Date() // or any specific date string
      };
      

      // Insert the new user into the database
      const createdUser = await Visitor.create(newUser);
    
      // Log the created user data
      console.log('User created successfully:', createdUser.dataValues);
    
      // return createdUser.dataValues;
    
    } catch (error) {
      console.error('Error inserting new user:', error);
      return null;
    }
    
  })

  //Reassing of guests
  ipcMain.on('reassign_guest', (event, data) => {
    // db.insert(data)
  })



  // ============ SEARCH INTERFACE =============//
  //QUICK SEARCH
  //By name
  ipcMain.on('search_by_name', async (event, data) => {


    let param = data.name
    param = param.toLowerCase();


    let table = 'visitors'
    let column = 'name'
    let results = await search(param, table, column)

    results = JSON.stringify(results);

    win.webContents.send("search_by_name_return", results);
    // console.log(results);
    // console.log('==========');
    
    
    

  })





  //By doc
  ipcMain.on('search_by_doc', async (event, data) => {

    let param = data.document
    let table = 'visitors'
    let column = 'document'
    let results = await search(param, table, column)

    win.webContents.send("search_by_doc_return", results)
  })


  //SEARCH BY MONTH
  ipcMain.on('search_by_month', async (event, data) => {
    return 'test';
    console.log('=====================');
    console.log(data);
    let param = Buffer.from(data, 'binary').toString('utf-8');
    console.log(param);
    let table = 'months'
    let column_month = 'month'
    let column_year = '2024'
    let results = await search(param, table, column_month, column_year)

    console.log(results);
    win.webContents.send('search_by_month_return', results)
  })



  async function search(param, table, column_1, column_2 = null) {

    try {
      // Use a LIKE query to match the name partially
      const users = await Visitor.findAll({
        where: {
          [column_1]: {
            [Sequelize.Op.like]: `%${param}%`
          }
        }
      });

      if (users.length > 0) {


        let user = users.map(user => user.dataValues);

        return user;

      } else {
        console.log('No users found');
        return [];
      }
    } catch (error) {
      console.error('Error searching for users:', error);
    }

    // try {

    //    // Retrieve a single user
    //    const userId = 1; // Adjust this to the ID of the user you want to retrieve
    //    const user = await Visitor.findByPk(userId);

    //    if (user) {
    //      console.log('User found:', user.toJSON());
    //    } else {
    //      console.log('User not found');
    //    }

    //   //Checks which SELECT query will be executed
    //   // if (column_2 === null) {

    //   //   //LIKE
    //   //   results = await con.query(`SELECT * FROM ${table} WHERE ${column_1} LIKE ?`, [`${param}%`]);

    //   // } else {


    //   //   results = await con.query(
    //   //     `SELECT * FROM ${table} WHERE month = ? AND year = ?`
    //   //     , [column_1, column_2]);
    //   // }

    //   return results;


    // } finally {
    //   // Ensure the connection is closed
    //   if (con && con.end) {
    //     await con.end();
    //     global.conexao = null; // Reset the global connection
    //   }
    // }
  }




  // ========= STATISTICS =============//
  //Today entries
  ipcMain.on('today_entries_call', (event, dat) => {
    const obj = dat
    const date = obj.date
    obj.date = new RegExp(date)

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



