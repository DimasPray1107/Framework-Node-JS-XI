// panggil si express 
const express = require(`express`)

// buat objek untuk express
const app = express()

// minta izin untuk membaca request dari user
app.use(express.urlencoded({ extended:true }))

// panggil controller auth
const authController = require(`../controllers/auth.controller`)

// membuat route untuk menampilkan hlm login
app.get(`/`,authController.showLogin)

// membuat route utk proses login
app.post(`/`,authController.authentication)

// membuat route untuk proses logout
app.get(`/logout`,authController.logout)

// support object app
module.exports = app