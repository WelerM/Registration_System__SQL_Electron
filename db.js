//Database 
const db_name = 'electron_reg_sys'//Your database name
const db_password = ''//Your database password
const db_port = 'localhost:3306'//Your port

const connection = async () => {
  if (global.conexao && global.conexao.state != 'disconected')
    return global.conexao
  const mysql = require('mysql2/promise')
  const con = mysql.createConnection(`mysql://root:${db_password}@${db_port}/${db_name}`)
  console.log('Connected');
  global.conexao = con
  return con
}

module.exports = {connection}