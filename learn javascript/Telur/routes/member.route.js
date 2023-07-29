/** load express js */
const express = require(`express`)

/** create object of express */
const app = express()

/** load obat controller */
const memberController = require(`../controller/member.controller`)

/** allow route to read urlencoded data */
app.use(express.urlencoded({ extended: true }))
const authorization = require(`../middleware/authorization`)


/** create route for access obat's data */
app.get("/",authorization.cekUser, memberController.showDataMember)

/** create route for show add obat view */
app.get("/add",authorization.cekUser, memberController.showAddPage)

/** create route for process of add new obat */
app.post("/add",authorization.cekUser, memberController.processInsert)

/** create route for show edit obat view */
app.get("/edit/:id",authorization.cekUser, memberController.showEditPage)
/** :id -> name of paramter URL */

/** create route for process edit obat */
app.post("/edit/:id",authorization.cekUser, memberController.processUpdate)
/** :id -> name of paramter URL */

/** create route for process delete obat */
app.get("/delete/:id",authorization.cekUser, memberController.processDelete)
/** :id -> name of paramter URL */





/** export object "app" to another file */
module.exports = app

