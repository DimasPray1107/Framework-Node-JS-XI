/** load express js */
const express = require(`express`)

/** create object of express */
const app = express()

/** minta izin untuk membaca data yang dikirimkan melalui form */
app.use(express.urlencoded({extended:true}))

const authorization = require(`../middleware/authorization`)

/** load obat controller */
const adminController = require(`../controller/admin.controller`)


/** create route for access obat's data */
app.get("/",authorization.cekUser, adminController.showDataAdmin)

/** create route for show add obat view */
app.get("/add",authorization.cekUser, adminController.showAddPage)

/** create route for process of add new obat */
app.post("/add",authorization.cekUser, adminController.processInsert)

/** create route for show edit obat view */ 
app.get("/edit/:id",authorization.cekUser, adminController.showEditPage)
/** :id -> name of paramter URL */

/** create route for process edit obat */
app.post("/edit/:id",authorization.cekUser, adminController.processUpdate)
/** :id -> name of paramter URL */

/** create route for process delete obat */
app.get("/delete/:id",authorization.cekUser, adminController.processDelete)
/** :id -> name of paramter URL */

/** export object "app" to another file */
module.exports = app

