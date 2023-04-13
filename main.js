const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path')
const date = new Date()
const date_day = date.getDate()
const date_month = date.getMonth()
const array_meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']



//Database 
const db_name = 'electron_reg_sys'//Your database name
const db_password = ''//Your database password
const db_port = 'localhost:3306'//Your port

const connection = async () => {
  if (global.conexao && global.conexao.state != 'disconected')
    return global.conexao
  const mysql = require('mysql2/promise')
  const con = mysql.createConnection(`mysql://root:${db_password}@${db_port}/${db_name}`)
  console.log('Conectou');
  global.conexao = con
  return con
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
  win.webContents.openDevTools()
  win.maximize()


  // =========== REGISTRATION INTERFACE =========//
  //Obj coming from registration form
  ipcMain.on('insert_data', (event, data) => {
    const insert_visitor = async () => {
      const con = await connection();
      const sql = 'INSERT INTO visitors (name, document, floor, visit_purpose, visit_date, visit_hour, visit_month, day) VALUES (?,?,?,?,?,?,?,?)'
      const values = [data.name, data.document, data.andar, data.visit_type, data.date, data.hour, data.month, data.day]
      await con.query(sql, values)
    }
    insert_visitor()
  })

  //Reassing of guests
  ipcMain.on('reassign_guest', (event, data) => {
    const query = async () => {
      const con = await connection();
      const sql = 'INSERT INTO visitors (name, document, floor, visit_purpose, visit_date, visit_hour, visit_month, day) VALUES (?,?,?,?,?,?,?,?)'
      const values = [data.name, data.document, data.andar, data.visit_type, data.date, data.hour, data.month, data.day]
      await con.query(sql, values)
    }
    query() 

  })



  // =========== QUICK SEARCH =========//
  //By name
  ipcMain.on('search_by_name', (event, data) => {
    const sample = data.name
    const sql_search_by_name = async () => {
      const con = await connection()
      const [lines] = await con.query(`SELECT * FROM visitors WHERE name LIKE("${sample}%");`)
      const result = lines
      win.webContents.send("search_by_name_return", result)
    }
    sql_search_by_name()
  })

  //By doc
  ipcMain.on('search_by_doc', (event, data) => {
    const sample = data.documento
    const sql_search_by_doc = async () => {
      const con = await connection()
      const [lines] = await con.query(`SELECT * FROM visitors WHERE document LIKE("${sample}%");`)
      const result = lines
      win.webContents.send("search_by_doc_return", result)
    }
    sql_search_by_doc()

  })






  //========= SEARCH BY MONTH ========= //
  //January
  ipcMain.on('jan', (event, data) => {
    const query = async () => { 
      const con = await connection()
      const [lines] = await con.query(`SELECT * FROM visitors WHERE visit_month = "janeiro";`)
      const data_return = lines
      console.log(lines)
      win.webContents.send('jan_return', data_return)
    }
    query()
  })
  //Febuary
  ipcMain.on('feb', (event, data) => {
    const query = async () => {
      const con = await connection()
      const [lines] = await con.query(`SELECT * FROM visitors WHERE visit_month = "fevereiro";`)
      const data_return = lines
      win.webContents.send('feb_return', data_return)
    }
    query()
  })
  //March
  ipcMain.on('mar', (event, data) => {
    const query = async () => {
      const con = await connection()
      const [lines] = await con.query(`SELECT * FROM visitors WHERE visit_month = "março";`)
      const data_return = lines
      win.webContents.send('mar_return', data_return)
    }
    query()
  })
  //April
  ipcMain.on('apr', (event, data) => {
    const query = async () => {
      const con = await connection()
      const [lines] = await con.query(`SELECT * FROM visitors WHERE visit_month = "abril";`)
      const data_return = lines
      win.webContents.send('apr_return', data_return)
    }
    query()
  })
  //May
  ipcMain.on('may', (event, data) => {
    const query = async () => {
      const con = await connection()
      const [lines] = await con.query(`SELECT * FROM visitors WHERE visit_month = "maio";`)
      const data_return = lines
      win.webContents.send('may_return', data_return)
    }
    query()
  })
  //June
  ipcMain.on('jun', (event, data) => {
    const query = async () => {
      const con = await connection()
      const [lines] = await con.query(`SELECT * FROM visitors WHERE visit_month = "junho";`)
      const data_return = lines
      win.webContents.send('jun_return', data_return)
    }
    query()
  })
  //Jul
  ipcMain.on('jul', (event, data) => {
    const query = async () => {
      const con = await connection()
      const [lines] = await con.query(`SELECT * FROM visitors WHERE visit_month = "julho";`)
      const data_return = lines
      win.webContents.send('jul_return', data_return)
    }
    query()
  })
  //ago
  ipcMain.on('ago', (event, data) => {
    const query = async () => {
      const con = await connection()
      const [lines] = await con.query(`SELECT * FROM visitors WHERE visit_month = "agosto";`)
      const data_return = lines
      win.webContents.send('ago_return', data_return)
    }
    query()
  })
  //sep
  ipcMain.on('sep', (event, data) => {
    const query = async () => {
      const con = await connection()
      const [lines] = await con.query(`SELECT * FROM visitors WHERE visit_month = "setembro";`)
      const data_return = lines
      win.webContents.send('sep_return', data_return)
    }
    query()
  })
  //out
  ipcMain.on('out', (event, data) => {
    const query = async () => {
      const con = await connection()
      const [lines] = await con.query(`SELECT * FROM visitors WHERE visit_month = "outubro";`)
      const data_return = lines
      win.webContents.send('out_return', data_return)
    }
    query()
  })
  //nov
  ipcMain.on('nov', (event, data) => {
    const query = async () => {
      const con = await connection()
      const [lines] = await con.query(`SELECT * FROM visitors WHERE visit_month = "novembro";`)
      const data_return = lines
      win.webContents.send('nov_return', data_return)
    }
    query()
  })
  //dez
  ipcMain.on('dez', (event, data) => {
    const query = async () => {
      const con = await connection()
      const [lines] = await con.query(`SELECT * FROM visitors WHERE visit_month = "dezembro";`)
      const data_return = lines
      win.webContents.send('dez_return', data_return)
    }
    query()
  })


  // ========= STATISTICS =============//
  //Today entries
  ipcMain.on('today_entries_call', (event, dat) => {
    const query = async () => {
      const con = await connection()
      const [lines] = await con.query(`SELECT * FROM visitors WHERE day = ${date_day};`)
      const data_return = lines
      win.webContents.send('today_entries_return', data_return)
    }
    query()

  })

  //Month entries
  ipcMain.on('month_entries_call', (event, data) => {
    const query = async () => {
      const con = await connection()
      const [lines] = await con.query(`SELECT * FROM visitors WHERE visit_month = "${array_meses[date_month]}";`)
      const data_return = lines
      win.webContents.send('month_entries_return', data_return)
    }
    query()


    //All entries
    ipcMain.on('all_data_call', (event, data) => {
      const query = async () => {
        const con = await connection()
        const [lines] = await con.query(`SELECT * FROM visitors;`)
        const data_return = lines
        win.webContents.send('all_data_return', data_return)
      }
      query()

    })
    //===========================================//

  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
})



