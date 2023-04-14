const { log } = require('console');
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path')
const date = new Date()
const date_day = date.getDate()
const date_month = date.getMonth()
const array_meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']







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
  ipcMain.on('insert_data', async (event, data) => {
    const db = require('./db')
    const con = await db.connection();
    const sql = 'INSERT INTO visitors (name, document, floor, visit_purpose, visit_date, visit_hour, visit_month, day) VALUES (?,?,?,?,?,?,?,?)'
    const values = [data.name, data.document, data.floor, data.visit_purpose, data.date, data.hour, data.month, data.day]
    await con.query(sql, values)
  })



  // =========== SEARCH INTERFACE =========//
  //========= SEARCH BY MONTH ========= //
  //January
  ipcMain.on('teste', async (event, data) => {
    const month = data
    const db = require('./db')
    const con = await db.connection()
    const [lines] = await con.query(`SELECT * FROM visitors WHERE visit_month = "${month}";`)
    const data_return = lines
    win.webContents.send('teste_return', data_return)
  })


  // ========= QUICK SEARCH ============//
  //By name
  ipcMain.on('search_by_name', async (event, data) => {
    const sample = data.name
    const db = require('./db')
    const con = await db.connection()
    const [lines] = await con.query(`SELECT * FROM visitors WHERE name LIKE("${sample}%");`)
    const result = lines
    win.webContents.send("search_by_name_return", result)


  })
  //By doc
  ipcMain.on('search_by_doc', async (event, data) => {
    const sample = data.documento
    const db = require('./db')
    const con = await db.connection()
    const [lines] = await con.query(`SELECT * FROM visitors WHERE document LIKE("${sample}%");`)
    const result = lines
    win.webContents.send("search_by_doc_return", result)
  })


  // ========= STATISTICS =============//
  //Today entries
  ipcMain.on('today_entries_call', async (event, dat) => {
    const db = require('./db')
    const con = await db.connection()
    const [lines] = await con.query(`SELECT * FROM visitors WHERE day = ${date_day};`)
    const data_return = lines
    win.webContents.send('today_entries_return', data_return)
  })

  //Month entries
  ipcMain.on('month_entries_call', async (event, data) => {
    const db = require('./db')
    const con = await db.connection()
    const [lines] = await con.query(`SELECT * FROM visitors WHERE visit_month = "${array_meses[date_month]}";`)
    const data_return = lines
    win.webContents.send('month_entries_return', data_return)
  })
  //All entries
  ipcMain.on('all_data_call', async (event, data) => {
    const db = require('./db')
    const con = await db.connection()
    const [lines] = await con.query(`SELECT * FROM visitors;`)
    const data_return = lines
    win.webContents.send('all_data_return', data_return)
  })


  //Reassing of guests
  ipcMain.on('reassign_guest', async (event, data) => {
    const db = require('./db')
    const con = await db.connection();
    const sql = 'INSERT INTO visitors (name, document, floor, visit_purpose, visit_date, visit_hour, visit_month, day) VALUES (?,?,?,?,?,?,?,?)'
    const values = [data.name, data.document, data.andar, data.visit_type, data.date, data.hour, data.month, data.day]
    await con.query(sql, values)
  })


  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
})



