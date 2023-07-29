/** load express js */
const express = require(`express`)

/** create object of express */
const app = express()

/** load obat controller */
const obatController = require(`../controllers/obat.controller`)

// allow route to read urlencoded data
app.use(express.urlencoded({ extended: true }))

// load authorization from middleware
const authorization = require(`../middleware/authorization`)

/** allow route to read urlencoded data */
app.use(express.urlencoded({ extended: true }))


/** create route for access obat's data */
app.get("/",authorization.cekUser , obatController.showDataObat)

/** create route for show add obat view */
app.get("/add",authorization.cekUser , obatController.showAddPage)

/** create route for process of add new obat */
app.post("/add",authorization.cekUser , obatController.processInsert)

/** create route for show edit obat view */
app.get("/edit/:id",authorization.cekUser ,obatController.showEditPage)
/** :id -> name of paramter URL */

/** create route for process edit obat */
app.post("/edit/:id",authorization.cekUser , obatController.processUpdate)
/** :id -> name of paramter URL */

app.get("/delete/:id",authorization.cekUser , obatController.processDelete)
/** create route for process delete obat */

app.post("/delete/:id",authorization.cekUser , obatController.processDelete)
/** :id -> name of paramter URL */

/** export object "app" to another file */
module.exports = app