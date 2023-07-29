/** load express js */
const express = require(`express`)

/** create object of express */
const app = express()

/** load pack controller */
const packController = require(`../controllers/pack.controller`)

// panggil authorization
const authorization = require(`../middleware/authorization`)

/** allow route to read urlencoded data */
app.use(express.urlencoded({ extended: true }))

/** create route for access pack's data */
app.get("/",authorization.cekUser,packController.showDataPack)

/** export object "app" to another file */
module.exports = app

/** create route for show add pack view */
app.get("/add",authorization.cekUser,packController.showAddPage)

/** create route for process of add new pack */
app.post("/add",authorization.cekUser,packController.processInsert)

/** create route for show edit pack view */
app.get("/edit/:id",authorization.cekUser,packController.showEditPage)
/** :id -> name of paramter URL */

/** create route for process edit pack */
app.post("/edit/:id",authorization.cekUser,packController.processUpdate)
/** :id -> name of paramter URL */

app.get("/delete/:id",authorization.cekUser,packController.processDelete)
/** create route for process delete pack */

app.post("/delete/:id",authorization.cekUser,packController.processDelete)
/** :id -> name of paramter URL */