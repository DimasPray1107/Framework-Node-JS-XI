// panggil express
const express = require(`express`)

// buat object 'app'
const app = express()

// minta izin utk membaca adta yg dikirimkan melalui form
app.use(express.urlencoded({extended:true}))

// panggil authorization
const authorization = require(`../middleware/authorization`)

// panggil controller customer
const customerController = require(`../controllers/customer.controllers`)

// define route utk akses data customer
app.get(`/`,authorization.cekUser, customerController.showDataCustomer)

// define route utk menampilkan form customer
app.get(`/add`,authorization.cekUser, customerController.showTambahCustomer)

// define route utk memproses tambah data customer
app.post(`/add`,authorization.cekUser, customerController.prosesTambahData)

// define route utk nampilin form customer dg data yang diubah
app.get(`/edit/:id`,authorization.cekUser, customerController.showEditCustomer)

// define route untuk memproses perubahan data
app.post(`edit/:id`,authorization.cekUser, customerController.prosesUbahData)

// export object app
module.exports = app