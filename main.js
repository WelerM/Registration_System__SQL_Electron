const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { Sequelize } = require('sequelize');
const Visitor = require('./models/visitor'); // Adjust the path accordingly
const Visit = require('./models/visits'); // Adjust the path accordingly

// Initialize Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database/registration_system.sqlite'
});

// Define associations
Visitor.hasMany(Visit, { foreignKey: 'user_id' }); // One Visitor has many Visits
Visit.belongsTo(Visitor, { foreignKey: 'user_id' }); // Each Visit belongs to one Visitor

//=======================================================================

async function initializeDatabase() {
  try {
    await sequelize.authenticate();


    // Sync models with the database (optional)
    await sequelize.sync();

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

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
  win.setMenu(null);

  win.maximize();

  win.webContents.once('did-finish-load', () => {
    // win.webContents.openDevTools();
  
    win.webContents.insertCSS('* { user-select: none !important; -webkit-user-select: none !important; }');
  
  });









  // =========== REGISTRATION INTERFACE =========//

  //Obj coming from registration form
  ipcMain.on('insert_data', async (event, data) => {

    try {

      // Define the new user data
      const newUser = {
        name: data.name.toLowerCase(),
        visitor_id: data.visitor_id,
        // created_at: new Date() // or any specific date string
      };



      // Insert the new user into the database
      let created_user = await Visitor.create(newUser);
      created_user = created_user.get({ plain: true });

      let nearly_created_user_id = created_user.id
      //---------------------------------------------



      // Now insert the new record for the "visits" table
      const newVisit = {
        user_id: nearly_created_user_id,  // Use the newly created user ID
        visiting_floor: data.visiting_floor, // Assuming you're passing this in 'data'
        visit_purpose: data.visit_purpose.toLowerCase()
      };

      // Insert the new visit into the database
      let created_visit = await Visit.create(newVisit);
      created_visit = created_visit.get({ plain: true });

      // Return success
      return { success: true, created_user, created_visit };

    } catch (error) {
      console.error('Error inserting new user:', error);

    }

  })


  //New register
  ipcMain.on('new_visit', async (event, data) => {

    // { user_id: 24, visiting_floor: 1, visit_purpose: 1 }

    try {

      // Retrieve the existing user by ID
      const existingUser = await Visitor.findOne({
        where: { id: data.user_id }
      });

      let existingVisit = await Visit.findOne({
        where: { user_id: data.user_id }
      });


      if (!existingUser || !existingVisit) {
        return;
      }

      let nearly_created_user_id = existingUser.dataValues.id;

      //Checks which visit purpose the user has chosen
      let visit_purpose = null;

      if (data.visit_purpose === 1) {
        visit_purpose = 'agendamento';
      } else if (data.visit_purpose === 2) {
        visit_purpose = 'serviços gerais';
      } else if (data.visit_purpose === 3) {
        visit_purpose = 'entrega no andar';
      } else if (data.visit_purpose === 4) {
        visit_purpose = 'falar com funcionário';
      } else if (data.visit_purpose === 5) {
        visit_purpose = 'outro';
      }

      // Now insert the new record for the "visits" table
      const new_visit = {
        user_id: nearly_created_user_id,  // Use the newly created user ID
        visiting_floor: data.visiting_floor, // Assuming you're passing this in 'data'
        visit_purpose: visit_purpose
      };



      // Insert the new visit into the database
      let created_visit = await Visit.create(new_visit);
      created_visit = created_visit.get({ plain: true });

      // Return success
      return { success: true };



    } catch (error) {
      console.error('Error reassigning user:', error);
    }
  })




  // ============ SEARCH INTERFACE =============//

  // Search by name input
  ipcMain.handle('search_by_name', async (event, data) => {
    let name = data.name.toLowerCase();

    try {
      // Modify the search to match names that start with the input
      let whereCondition = {
        '$Visitor.name$': {
          [Sequelize.Op.like]: `${name}%`  // Search for visitor names starting with the input
        }
      };

      const visits = await Visit.findAll({
        where: whereCondition,
        include: [{
          model: Visitor,
          required: true, // Ensure we only get visits with associated visitors
          attributes: ['id', 'name', 'visitor_id', 'created_at'], // Specify the visitor attributes to include
          where: { name: { [Sequelize.Op.like]: `${name}%` } } // Add condition for visitor names
        }],
        order: [['created_at', 'DESC']], // Order by visit date
        logging: console.log // This logs the raw SQL query
      });

      // Return results
      if (visits.length > 0) {
        let result = visits.map(visit => {
          // Map visit data along with associated visitor data
          return {
            id: visit.id, // Visit ID
            visiting_floor: visit.visiting_floor, // Visit details
            visit_purpose: visit.visit_purpose, // Visit details
            created_at: visit.created_at, // Visit created date
            visitor: { // Nested visitor object
              id: visit.Visitor.id,
              name: visit.Visitor.name,
              visitor_id: visit.Visitor.visitor_id,
              created_at: visit.Visitor.created_at,
            }
          };
        });


        return result;
      } else {
        return [];
      }

    } catch (error) {
      console.error("Error during search:", error);
      throw error;
    }
  });



  // Search by document input
  ipcMain.handle('search_by_doc', async (event, data) => {
    // Get visitor_id from input and convert it to a string for LIKE comparison
    let visitor_id = String(data.visitor_id).trim(); // Trim any whitespace

    // Ensure visitor_id is not empty before proceeding with the search
    if (!visitor_id) {
      return []; // Return an empty array if the input is empty
    }

    try {
      // Perform the search for visits where the associated visitor matches the specified visitor_id using LIKE
      const visits = await Visit.findAll({
        include: [{
          model: Visitor,
          required: true, // Ensure we only get visits with associated visitors
          attributes: ['id', 'name', 'visitor_id', 'created_at'], // Specify visitor attributes to include
          where: { visitor_id: { [Sequelize.Op.like]: `${visitor_id}%` } } // Use LIKE operator for visitor_id
        }],
        order: [['created_at', 'DESC']], // Order by visit date
        logging: console.log // Log the raw SQL query for debugging purposes
      });

      // Return results
      if (visits.length > 0) {
        let result = visits.map(visit => {
          return {
            id: visit.id, // Visit ID
            visiting_floor: visit.visiting_floor, // Visit details
            visit_purpose: visit.visit_purpose, // Visit details
            created_at: visit.created_at, // Visit created date
            visitor: { // Nested visitor object
              id: visit.Visitor.id,
              name: visit.Visitor.name,
              visitor_id: visit.Visitor.visitor_id,
              created_at: visit.Visitor.created_at,
            }
          };
        });

        return result;
      } else {
        return []; // Return an empty array if no visits are found
      }
    } catch (error) {
      console.error("Error during document search:", error);
      throw error;
    }
  });


  //SEARCH BY MONTH - 
  ipcMain.handle('search_by_calendar', async (event, data) => {

    let calendar_obj = data;

    let day = calendar_obj.day;
    let month = calendar_obj.month;
    let year = calendar_obj.year;

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

    // Query the Visit table and include the associated Visitor records
    let visits = await Visit.findAll({
      where: whereCondition,
      order: [['created_at', 'DESC']],
      include: [ // Include visitor information in the result
        {
          model: Visitor, // Assuming `Visitor` is the related model
          as: 'Visitor' // Adjust alias if needed
        }
      ]
    });

    // Map over visits to format the result
    let result = visits.map(visit => {
      return {
        visiting_floor: visit.visiting_floor,
        visit_purpose: visit.visit_purpose,
        created_at: visit.created_at, // Visit created_at
        visitor: { // Visitor info
          id: visit.Visitor.id,
          name: visit.Visitor.name,
          visitor_id: visit.Visitor.visitor_id,
          created_at: visit.Visitor.created_at // Visitor created_at
        }
      };
    });

    // Return the formatted result

    return result;

  });

  ipcMain.handle('search_by_period', async (event, data) => {
  // Convert dates to UTC by using toISOString().slice(0, 19) to get the YYYY-MM-DDTHH:MM:SS format
  let initial_date = new Date(data.initial_date).toISOString().slice(0, 19).replace('T', ' ');
  let ending_date = new Date(data.ending_date);
  
  // Set ending_date to the end of the specified day in UTC and format it
  ending_date.setUTCHours(23, 59, 59, 999);
  ending_date = ending_date.toISOString().slice(0, 19).replace('T', ' ');

  const whereCondition = {
      created_at: {
          [Sequelize.Op.between]: [initial_date, ending_date]
      }
  };

  // Query the Visit table with the specified date range
  let visits = await Visit.findAll({
      where: whereCondition,
      order: [['created_at', 'DESC']],
      include: [
          {
              model: Visitor,
              as: 'Visitor'
          }
      ]
  });

  // Format the result
  let result = visits.map(visit => {
      return {
          visiting_floor: visit.visiting_floor,
          visit_purpose: visit.visit_purpose,
          created_at: visit.created_at,
          visitor: {
              id: visit.Visitor.id,
              name: visit.Visitor.name,
              visitor_id: visit.Visitor.visitor_id,
              created_at: visit.Visitor.created_at
          }
      };
  });


    return JSON.stringify(result);
  })


  ipcMain.handle('find_one', async (event, data) => {
    // Validate the incoming ID to ensure it's an integer
    if (!Number.isInteger(data)) {
      return JSON.stringify({ error: "Invalid ID: must be an integer." });
    }

    try {
      // Find the visitor based on their ID
      const visitor = await Visitor.findOne({
        where: { id: data }, // Match the visitor by their ID
        attributes: ['id', 'name', 'visitor_id', 'created_at'], // Select visitor's fields
        include: [{
          model: Visit,
          as: 'Visits', // Correct alias here (capital 'V' as per your model)
          attributes: ['id', 'visiting_floor', 'visit_purpose', 'created_at'], // Specify visit attributes
          order: [['created_at', 'DESC']] // Order visits by date
        }],
        logging: console.log // Log SQL query for debugging
      });

      // If no visitor is found, return an error
      if (!visitor) {
        return JSON.stringify({ error: "Visitor not found." });
      }

      // Create a response object with the visitor's information and their related visits
      let result = {
        id: visitor.id,
        name: visitor.name,
        visitor_id: visitor.visitor_id,
        created_at: visitor.created_at,
        visits: visitor.Visits.map(visit => ({
          // id: visit.id,
          visiting_floor: visit.visiting_floor,
          visit_purpose: visit.visit_purpose,
          created_at: visit.created_at
        }))
      };

      // Return the result as a JSON object
      return JSON.stringify(result);

    } catch (error) {
      console.error("Error during find_one:", error);
      return JSON.stringify({ error: "An error occurred while fetching the data." });
    }
  });



  // ========= STATISTICS =============//

  //Today entries not owrking

  ipcMain.handle('today_visits', async () => {
    const today = new Date();
    const date = today.toISOString().split('T')[0];
    const formatted_date = date.split('-');
    const day = formatted_date[2];
    const month = formatted_date[1];
    const year = formatted_date[0];

    // Build the date string (YYYY-MM-DD)
    const date_start = new Date(`${year}-${month}-${day}T00:00:00.000Z`);
    const next_day = new Date(`${year}-${month}-${(parseInt(day, 10) + 1).toString().padStart(2, '0')}T00:00:00.000Z`);

    // Set up the `where` condition for the Sequelize query
    const whereCondition = {
      created_at: {
        [Sequelize.Op.gte]: date_start,
        [Sequelize.Op.lt]: next_day,
      },
    };

    try {
      let users = await Visit.findAll({
        where: whereCondition,
        order: [['created_at', 'DESC']],
      });

      users = users.map(user => user.dataValues);

      return JSON.stringify(users);

    } catch (error) {
      console.error("Error fetching today's entries:", error);
      return []; // Return an empty array or handle the error appropriately
    }
  });


  //Month entries
  ipcMain.handle('month_visits', async () => {

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth(); // Months are 0-indexed in JavaScript (0 = January, 11 = December)

    // Get the first and last days of the current month
    const date_start = new Date(year, month, 1); // First day of the month
    const date_end = new Date(year, month + 1, 0, 23, 59, 59, 999); // Last day of the month

    // Set up the `where` condition for the Sequelize query
    const whereCondition = {
      created_at: {
        [Sequelize.Op.gte]: date_start,
        [Sequelize.Op.lte]: date_end
      }
    };


    try {
      let users = await Visit.findAll({
        where: whereCondition,
        order: [['created_at', 'DESC']]
      });

      users = users.map(user => user.dataValues);
      return users;

      return JSON.stringify(users);


    } catch (error) {

    }

  });


  //total entries not working
  ipcMain.handle('all_visits', async () => {


    try {

      let users = await Visit.findAll({
        order: [['created_at', 'DESC']] // Optionally, you can keep this to order the results by creation date
      });


      users = users.map(user => user.dataValues);

      return JSON.stringify(users);

    } catch (error) {

    }

  })
  //===========================================//





  win.loadFile('public/index.html')
}

app.whenReady().then(() => {
  initializeDatabase();
  createWindow()
})



