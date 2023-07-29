/** load express library */
const express = require(`express`)
const app = express()

/** load controller of transaksi */
const transaksiController = require(`../controllers/transaksi.controller`)

/** allow to read json on body request */
app.use(express.json())

/** call authorization method */
const {authorization} = require(`../controllers/auth.controller`)

/** create route to get all transaksi */
app.get(`/transaksi`, authorization(["admin", "kasir","manajer"]), transaksiController.getTranskasi)

/** create route to add transaksi */
app.post(`/transaksi`, authorization(["admin", "kasir"]), transaksiController.addTransaksi)

/** create route to edit transaksi */
app.put(`/transaksi/:id_transaksi`, authorization(["admin", "kasir"]), transaksiController.updateTransaksi)

/** create route to delete transakasi */
app.delete(`/transaksi/:id_transaksi`, authorization(["admin", "kasir"]), transaksiController.deleteTransaksi)

/** export app */
module.exports = app