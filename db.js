/* async function conectar(){
    if(global.conexao && global.conexao.state != 'disconected')
        return global.con
    const mysql = require('mysql2/promise')
    const con = mysql.createConnection("mysql://root:1234567@localhost:3306/teste")
    console.log('conectou');
    global.conexao=con
    return con
}
conectar()

module.exports = {}  */