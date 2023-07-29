//panggil express
const express = require(`express`)

// bikin object express
const app= express()

// minta ijin utk membaca data
app.use(express.urlencoded({extended:true}))

// panggil controller transaksi
const transaksiController= require(`../controller/transaksi.controller`)

// panggil authorization dari middleware
const authorization = require(`../middleware/authorization`)   

// definisakan routeu utk menambah isi cart
app.post(`/`,authorization.cekUser,transaksiController.addToCart)

// definisikan route utk menghapus item pda cart
app.get(`/:id`,authorization.cekUser,transaksiController.hapusCart)

// export object app
module.exports= app