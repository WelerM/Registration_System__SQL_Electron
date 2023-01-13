const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path')
const date = new Date()
const date_day = date.getDate()
const date_month = date.getMonth()
const date_month_edited = date.getMonth() + 1
const date_year = date.getFullYear()
const array_meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']


//Database
const connection = async () => {
  if (global.conexao && global.conexao.state != 'disconected')
    return global.conexao
  const mysql = require('mysql2/promise')
  const con = mysql.createConnection('mysql://root:1234567@localhost:3306/visitors_database')
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
  win.webContents.openDevTools()


  // =========== REGISTRATION INTERFACE =========//
  //Obj coming from registration form
  ipcMain.on('insert_data', (event, data) => {
        const insert_visitor = async () => {
          const con = await connection();
          const sql = 'INSERT INTO visitors (name, document, andar, visit_type, date, hour, month, day) VALUES (?,?,?,?,?,?,?,?)'
          const values = [data.name, data.document, data.andar, data.visit_type, data.date, data.hour, data.month, data.day]
          await con.query(sql, values)
        }
        insert_visitor()
  })

  //Reassing of guests
  /*    ipcMain.on('reassign_guest', (event, data) => {
       db.insert(data)
     }) */



  // =========== QUICK SEARCH =========//
  //By name
  ipcMain.on('search_by_name', (event, data) => {
    const sample = data.name
    const sql_search_by_name = async () => {
      const con = await connection()
      const [linhas] = await con.query(`SELECT * FROM visitors WHERE name LIKE("${sample}%");`)
      const movies_title_a = linhas
      win.webContents.send("search_by_name_return", movies_title_a)
    }
    sql_search_by_name()
  })
  //By doc
  /* ipcMain.on('search_by_doc', (event, data) => {
    function search_by_doc() {
      const obj = data
      const documento = obj.documento
      console.log(documento);
      obj.documento = new RegExp(documento)
      db.find(obj, (err, data) => {
        if (data) {
          win.webContents.send("search_by_doc", data)
        }
      })
    }
    search_by_doc()
  }) */






  //========= SEARCH BY MONTH ========= //
  //January
  ipcMain.on('jan', (event, data) => {
    const query = async () => {
      const con = await connection()
      const [lines] = await con.query(`SELECT * FROM visitors WHERE month = "janeiro";`)
      const data_return = lines
      win.webContents.send('jan_return', data_return)
    }
    query()
  })
  //Febuary
  ipcMain.on('feb', (event, data) => {
    const query = async () => {
      const con = await connection()
      const [lines] = await con.query(`SELECT * FROM visitors WHERE month = "fevereiro";`)
      const data_return = lines
      win.webContents.send('feb_return', data_return)
    }
    query()
  })
  //March
  ipcMain.on('mar', (event, data) => {
    const query = async () => {
      const con = await connection()
      const [lines] = await con.query(`SELECT * FROM visitors WHERE month = "março";`)
      const data_return = lines
      win.webContents.send('mar_return', data_return)
    }
    query()
  })
  //April
  ipcMain.on('apr', (event, data) => {
    const query = async () => {
      const con = await connection()
      const [lines] = await con.query(`SELECT * FROM visitors WHERE month = "abril";`)
      const data_return = lines
      win.webContents.send('apr_return', data_return)
    }
    query()
  })
  //May
  ipcMain.on('may', (event, data) => {
    const query = async () => {
      const con = await connection()
      const [lines] = await con.query(`SELECT * FROM visitors WHERE month = "maio";`)
      const data_return = lines
      win.webContents.send('may_return', data_return)
    }
    query()
  })
  //June
  ipcMain.on('jun', (event, data) => {
    const query = async () => {
      const con = await connection()
      const [lines] = await con.query(`SELECT * FROM visitors WHERE month = "junho";`)
      const data_return = lines
      win.webContents.send('jun_return', data_return)
    }
    query()
  })
  //Jul
  ipcMain.on('jul', (event, data) => {
    const query = async () => {
      const con = await connection()
      const [lines] = await con.query(`SELECT * FROM visitors WHERE month = "julho";`)
      const data_return = lines
      win.webContents.send('jul_return', data_return)
    }
    query()
  })
  //ago
  ipcMain.on('ago', (event, data) => {
    const query = async () => {
      const con = await connection()
      const [lines] = await con.query(`SELECT * FROM visitors WHERE month = "agosto";`)
      const data_return = lines
      win.webContents.send('ago_return', data_return)
    }
    query()
  })
  //sep
  ipcMain.on('sep', (event, data) => {
    const query = async () => {
      const con = await connection()
      const [lines] = await con.query(`SELECT * FROM visitors WHERE month = "setembro";`)
      const data_return = lines
      win.webContents.send('sep_return', data_return)
    }
    query()
  })
  //out
  ipcMain.on('out', (event, data) => {
    const query = async () => {
      const con = await connection()
      const [lines] = await con.query(`SELECT * FROM visitors WHERE month = "outubro";`)
      const data_return = lines
      win.webContents.send('out_return', data_return)
    }
    query()
  })
  //nov
  ipcMain.on('nov', (event, data) => {
    const query = async () => {
      const con = await connection()
      const [lines] = await con.query(`SELECT * FROM visitors WHERE month = "novembro";`)
      const data_return = lines
      win.webContents.send('nov_return', data_return)
    }
    query()
  })
  //dez
  ipcMain.on('dez', (event, data) => {
    const query = async () => {
      const con = await connection()
      const [lines] = await con.query(`SELECT * FROM visitors WHERE month = "dezembro";`)
      const data_return = lines
      win.webContents.send('dez_return', data_return)
    }
    query()
  })








  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
})


/*

  // ========= STATISTICS =============//
  //Today entries
  ipcMain.on('today_entries_call', (event, dat) => {
    const obj = dat
    const data = obj.data
    obj.data = new RegExp(data)
    db.find(obj, (err, data) => {
      win.webContents.send('today_entries_return', data)
    });
  })

  //Month entries
  ipcMain.on('month_entries_call', (event, data) => {
    function month_entries_return() {
      const obj = data
      const mes = obj.mes
      obj.mes = new RegExp(mes)
      db.find(obj, (err, data) => {
        win.webContents.send('month_entries_return', data)
      });
    }
    month_entries_return()
  })

  //All entries
  ipcMain.on('all_data_call', (event, data) => {
    function all_data_return() {
      db.find({}, (err, data) => {
        win.webContents.send('all_data_return', data)
      });
    }
    all_data_return()
  })
  //===========================================//
 */
