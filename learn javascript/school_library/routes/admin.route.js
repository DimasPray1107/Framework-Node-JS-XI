/** load library express */
const express = require(`express`)
/** initiate object that instance of express */
const app = express()
/** allow to read 'request' with json type */
app.use(express.json())         

/** load admin's controller */
const adminController =
require(`../controllers/admin.controller`)

/** create route to get data with method "GET" */
app.get("/", adminController.getAlladmin)

/** create route to add new admin using method "POST" */
app.post("/", adminController.addadmin)

/** create route to find admin
* using method "POST" and path "find" */
app.post("/find", adminController.findadmin)

/** create route to update admin
* using method "PUT" and define parameter for "id" */
app.put("/:id", adminController.updateadmin)

/** create route to delete admin
* using method "DELETE" and define parameter for "id" */
app.delete("/:id", adminController.deleteadmin)

/** export app in order to load in another file */
module.exports = app

