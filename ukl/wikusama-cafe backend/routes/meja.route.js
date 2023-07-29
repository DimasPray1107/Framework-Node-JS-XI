const express = require(`express`)
const app = express()

// untuk membaca apa yang direquestkan
app.use(express.json())

// memanggil controller
const mejaController = require(`../controllers/meja.controller`)
const { authorization }  = require (`../controllers/auth.controller`)

app.get(`/meja`, authorization(["admin", "manajer","kasir"]), mejaController.getMeja)
app.get(`/meja/available`, authorization(["admin", "manajer","kasir"]), mejaController.availableMeja)
app.post(`/meja`, authorization(["admin", "manajer","kasir"]), mejaController.addMeja)
app.put(`/meja/:id_meja`, authorization(["admin", "manajer","kasir"]), mejaController.updateMeja)
app.delete(`/meja/:id_meja`, authorization(["admin", "manajer","kasir"]), mejaController.deleteMeja)

//mengekspor app objek
module.exports = app