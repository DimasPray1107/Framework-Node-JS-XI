/** load express js */
const express = require(`express`)

/** create object of express */
const app = express()

/** load obat controller */
const packController = require(`../controller/pack.controller`)

/** allow route to read urlencoded data */
app.use(express.urlencoded({ extended: true }))

const authorization = require(`../middleware/authorization`)


/** create route for access obat's data */
app.get("/",authorization.cekUser, packController.showDataPack)

/** create route for show add obat view */
app.get("/add",authorization.cekUser, packController.showAddPage)

/** create route for process of add new obat */
app.post("/add",authorization.cekUser, packController.processInsert)

/** create route for show edit obat view */
app.get("/edit/:id",authorization.cekUser, packController.showEditPage)
/** :id -> name of paramter URL */

/** create route for process edit obat */
app.post("/edit/:id",authorization.cekUser, packController.processUpdate)
/** :id -> name of paramter URL */

/** create route for process delete obat */
app.get("/delete/:id",authorization.cekUser, packController.processDelete)
/** :id -> name of paramter URL */





/** export object "app" to another file */
module.exports = app

