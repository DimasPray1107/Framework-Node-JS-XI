// panggil express
const express = require(`express`)

// buat object dari express
const app = express()

// ijin membaca data dari request.body
app.use(express.urlencoded({extended:true}))

// panggil controller transaksi
const transaksiController = require(`../controller/transaksi.controller`)

// panngil middelware untuk autorization
const authorization = require(`../middleware/authorization`)

// route menampilkan form transaksi
app.get(`/add`,authorization.cekUser,transaksiController.showFromTransaksi)

// route menyimpan data transaksi
app.post(`/add`,authorization.cekUser,transaksiController.simpanTransaksi )

// route menampilkan data transaksi
app.get(`/`,authorization.cekUser, transaksiController.showTransaksi )

/** rouye untuk menghapus data transaksi */
app.get(`/:id`, authorization.cekUser, transaksiController.hapusTransaksi)

// export object app
module.exports = app