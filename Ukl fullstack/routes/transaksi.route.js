// panggil express
const express = require( `express`)

// buat object dari express
const app = express()

// ijin membaca dari data request.body
app.use(express.urlencoded({extended: true}))

//panggil controller transaksi
const transaksiController = require (`../controllers/transaksi.controller`)

// panggil middleware utk authorization
const authorization = require(`../middleware/authorization`)

app.get(`/`, authorization.cekUser, transaksiController.showTransaksi)

//route utk menampilkan form transaksi
app.get(`/add`, authorization.cekUser,transaksiController.showFormTransaksi)

// route unntuk menyimpan data transaksi
app.post(`/add`, authorization.cekUser,transaksiController.simpanTransaksi)

//route utk menghapus data transaksi
app.get(`/:id`, authorization.cekUser, transaksiController.hapusTransaksi)

// export object app
module.exports = app