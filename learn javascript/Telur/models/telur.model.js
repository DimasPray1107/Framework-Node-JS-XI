/** model file for obat contains CRUD process */

/** call object 'connection'
 * from config.js
 */
 const connection = require(`../config`)

 /** set table name to manage in this model file */
 const tableName = `telur`
 
 /** ----------------------------------------------------------------------- 
  * create and export 
  * function to get data from table */
 exports.findAll = () => {
     return new Promise((resolve, rejected) => {
         /** define query to get all data */
         let query = `select * from ${tableName} order by jenis_telur asc`
 
         /** show query as log in console */
         console.log(`Run: ${query}`)
 
         /** run query */
         connection.query(query, (error, result) => {
             if (error) {
                 /** reject with error message */
                 rejected(error)
             }
 
             /** return resolve with data */
             resolve(result)
         })
     })
 }
 
 /** ----------------------------------------------------------------------- 
  * create and export 
  * function to get data from table with specific criteria */
 exports.findByCriteria = (parameter) => {
     return new Promise((resolve, rejected) => {
         /** -----------------------------------------
          * parameter contain data like this:
          * parameter = {
          *      nama_obat: 'Obat 1',
          *      harga: 1000
          * }
          * 
          * to create Query for get data using criteria, we have to
          * arrange every key and its value of parameter
          * to be string
          * ----------------------------------------------
          */
 
         /** ----------------------------------------------
          * arrange list of parameter's keys and its value as string */
         let params = Object
             .keys(parameter)
             .map(key => `${key}="${parameter[key]}"`)
             .join(" and ")
         /** result:
          * params = ' nama_obat="Obat 1" and harga="1000" '
          * ------------------------------------------------
          */
 
         /** define query to get all data */
         let query = `select * from ${tableName} where ${params}`
 
         /** show query as log in console */
         console.log(`Run: ${query}`)
 
         /** run query */
         connection.query(query, (error, result) => {
             if (error) {
                 /** reject with error message */
                 rejected(error)
             }
 
             /** return resolve with data */
             resolve(result)
         })
     })
 }
 
 /** ----------------------------------------------------------------------- 
  * create and export 
  * function to insert new data to table */
 exports.add = (dataObject) => {
     return new Promise((resolve, rejected) => {
         /** -----------------------------------------
          * dataObject contain data like this:
          * dataObject = {
          *      nama_obat: `Obat 1`,
          *      expired_date: `2023-01-01`,
          *      stok: `10`,
          *      harga: `15000`,
          *      jenis: `kapsul`
          * }
          * 
          * to create Query for insert data, we have to
          * arrange every key and its value to be string
          * ----------------------------------------------
          */
 
         /** ----------------------------------------------
          * arrange list of dataObject's key as string */
         let columns = Object.keys(dataObject).join()
         /** result:
          * columns = 'nama_obat, expired_date, stok, harga, jenis'
          * -----------------------------------------------
          */
 
         /** ---------------------------------------------- 
          * arrange list of dataObject's values as string */
         let values = Object.values(dataObject)
             .map(value => `"${value}"`).join()
         /** result:
          * values = ' "Obat 1", "2023-01-01", "10", "15000", "kapsul" '
          * ------------------------------------------------
          */
 
         /** create query for insert */
         let query = `insert into ${tableName} (${columns}) values (${values})`
 
         /** show query as log in console */
         console.log(`Run: ${query}`)
 
         /** run query */
         connection.query(query, (error, result) => {
             if (error) {
                 /** reject with error message */
                 rejected(error.message)
             }
 
             /** return resolve with data */
             resolve(result)
         })
     })
 }
 
 /** ----------------------------------------------------------------------- 
  * create and export 
  * function to update data of table */
 exports.update = (dataObject, parameter) => {
     return new Promise((resolve, rejected) => {
         /** -----------------------------------------
          * dataObject contain data like this:
          * dataObject = {
          *      nama_obat: `Obat 1`,
          *      expired_date: `2023-01-01`,
          *      stok: `10`,
          *      harga: `15000`,
          *      jenis: `kapsul`
          * }
          * 
          * parameter contain data like this:
          * parameter = {
          *      id: '1'
          * }
          * 
          * to create Query for update data, we have to
          * arrange every key and its value of dataObject to be string,
          * then arrange every key and its value of parameter
          * to be string
          * ----------------------------------------------
          */
 
         /** ----------------------------------------------
          * arrange list of dataObject's keys and its values as string */
         let updateData = Object
             .keys(dataObject)
             .map(key => `${key}="${dataObject[key]}"`)
             .join()
         /** result:
          * updateData = ' nama_obat="Obat 1", expired_date="2023-01-01",
          * stok="10", harga="15000", jenis="kapsul" '
          * ------------------------------------------------
          */
 
         /** ----------------------------------------------
          * arrange list of parameter's keys and its value as string */
         let params = Object
             .keys(parameter)
             .map(key => `${key}="${parameter[key]}"`)
             .join(" and ")
         /** result:
          * params = ' id="1" '
          * ------------------------------------------------
          */
 
         /** create query for update */
         let query = `update ${tableName} set ${updateData} where ${params}`
 
         /** show query as log in console */
         console.log(`Run: ${query}`)
 
         /** run query */
         connection.query(query, (error, result) => {
             if (error) {
                 /** reject with error message */
                 rejected(error.message)
             }
 
             /** return resolve with data */
             resolve(result)
         })
     })
 }
 
 /** ----------------------------------------------------------------------- 
  * create and export 
  * function to delete data of table */
 exports.delete = (parameter) => {
     return new Promise((resolve, rejected) => {
         /** -----------------------------------------
          * parameter contain data like this:
          * parameter = {
          *      id: '1'
          * }
          * 
          * to create Query for update data, we have to
          * arrange every key and its value of parameter
          * to be string
          * ----------------------------------------------
          */
 
         /** ----------------------------------------------
          * arrange list of parameter's keys and its value as string */
         let params = Object
             .keys(parameter)
             .map(key => `${key}="${parameter[key]}"`)
             .join(" and ")
         /** result:
          * params = ' id="1" '
          * ------------------------------------------------
          */
 
         /** create query for delete */
         let query = `delete from ${tableName} where ${params}`
 
         /** show query as log in console */
         console.log(`Run: ${query}`)
 
         /** run query */
         connection.query(query, (error, result) => {
             if (error) {
                 /** reject with error message */
                 rejected(error.message)
             }
 
             /** return resolve with data */
             resolve(result)
         })
     })
 }
 