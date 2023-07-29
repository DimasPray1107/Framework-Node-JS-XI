const express = require(`express`)
const app = express()
app.use(express.json())

const menuController = require(`../controllers/menu.controller`)
const { authorization }  = require (`../controllers/auth.controller`)

app.post(`/menu`,authorization(["admin", "manajer"]), menuController.addMenu)
app.get(`/menu`,authorization(["admin", "manajer","kasir"]), menuController.getMenu)
app.post(`/menu/find`,authorization(["admin", "manajer"]), menuController.findMenu)
app.put(`/menu/:id_menu`,authorization(["admin", "manajer"]), menuController.updateMenu)
app.delete(`/menu/:id_menu`,authorization(["admin", "manajer"]), menuController.deleteMenu)

module.exports = app