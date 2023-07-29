let mysql = require(`mysql2`)   
const hostName = `localhost`
const username = `root`
const password = ``
const dbName = `db_apotek`


const connection = mysql.createConnection({
    host: hostName,
    user: username,
    password: password,
    database: dbName
})

module.exports = connection