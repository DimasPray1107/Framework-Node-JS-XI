/** load library mysql2  */
let mysql = require(`mysql2`)

/** set host name for connect to mysql */
const hostName = `localhost`

/** set username for connect to mysql */
const username = `root`

/** set password for connect to mysql */
const password = ``

/** set selected database name */
const dbName = `db_penjualantelur`

/** create object 'connection'
 * to create connection for mysql
  */

const connection = mysql.createConnection({
    host: hostName,
    user: username,
    password: password,
    database: dbName
})

/** export object 'connection' in order to 
 * use in another file */
module.exports = connection
