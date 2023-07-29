// memanggil si express
const express = require(`express`)

// membuat object `app`
const app = express()

// minta izin utk membaca data yg dikirimkan melalui form
app.use(express.urlencoded({ extended: true }))

// panggil authorization
const authorization = require(`../middleware/authorization`)

// memanggil controller apoteker
const apotekerController = require(`../controllers/apoteker.controllers`)

// defind row untuk akses data apoteker
app.get(`/`,authorization.cekUser, apotekerController.showDataApoteker)

// defind row untuk menampilkan form apoteker
app.get(`/add`,authorization.cekUser, apotekerController.showTambahApoteker)

// defind routes untuk memproses tambah data apoteker
app.post(`/add`,authorization.cekUser, apotekerC    ontroller.prosesTambahData)

// define route utk nampilin form apoteker dg data yg akan di ubah
app.get(`/edit/:id`,authorization.cekUser, apotekerController.showEditApoteker)

/**define route untuk memproses perubahan data */
app.post(`/edit/:id`,authorization.cekUser, apotekerController.prosesUbahData)

// define route untuk menghapus data
app.get(`/delete/:id`,authorization.cekUser, apotekerController.prosesHapusData)

// export object app
module.exports = app