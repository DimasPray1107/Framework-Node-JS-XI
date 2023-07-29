// panggil express
const express = require(`express`)

// buat object 'app'
const app = express()

// minta izin utk membaca adta yg dikirimkan melalui form
app.use(express.urlencoded({extended:true}))

// panggil authorization
const authorization = require(`../middleware/authorization`)

// panggil controller member
const memberController = require(`../controllers/member.controllers`)

// define route utk akses data member
app.get(`/`,memberController.showDataMember)

// define route utk menampilkan form member
app.get(`/add`,authorization.cekUser,memberController.showTambahMember)

// define route utk memproses tambah data member
app.post(`/add`,authorization.cekUser,memberController.prosesTambahData)

// define route utk nampilin form member dg data yang diubah
app.get(`/edit/:id`,authorization.cekUser,memberController.showEditMember)

// define route untuk memproses perubahan data
app.post(`/edit/:id`,authorization.cekUser,memberController.prosesUbahData)

// define route untuk menghapus data
app.get(`/delete/:id`,authorization.cekUser,authorization.cekUser,memberController.prosesHapusData)

// export object app
module.exports = app