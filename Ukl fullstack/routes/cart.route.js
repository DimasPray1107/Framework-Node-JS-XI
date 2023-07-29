// panggil espress
const express = require(`express`)

// bikin object express
const app = express()

// minta ijin utk membaca data
app.use(express.urlencoded({extended: true}))

// panggil controller transaksi
const transaksiController = require (`../controllers/transaksi.controller`)

// panggil autorization ddari middleware
const autorization = require(`../middleware/authorization`)

// definisikan route utk menambahkan isi cart
app.post(`/`,autorization.cekUser, transaksiController.addToCart)

// definisikan route utk menghapus item pd cart
app.get(`/:id`, autorization.cekUser, transaksiController.hapusCart)


//export object app
module.exports = app