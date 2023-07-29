// load data apoteker 
const adminModel = require(`../models/admin.model`)

// load crypt
const crypt = require(`../crypt`)
const { request, response } = require("express")


// function menampilkan halaman login
exports.showLogin = (request, response) => {
    try {
        return response.render(`../views/pages/login`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// function untuk proses authentication
exports.authentication = async (request, response) => {
    try {
        // tampung data username  dan password yang diisikan 
        let username = request.body.username
        let password = request.body.password

        // cek keberadaaan username dan password
        let result = await adminModel.findByCriteria({ username: username })

        // cek eksistensi data apoteker
        if (result.length > 0) {

            // cek kecocokan passwordnya
            // 123 === deskripsi(fsiugfksjfksb)
            // console.log(`${password} === ${crypt.deskripsi(result[0].password)}`);
            if (password === crypt.deskripsi(result[0].password)) {

                // login berhasil 

                // menyimpan data user ke session 
                // userData = label of session
                request.session.dataUser = result[0]

                // definisi cart session
                request.session.cart = []
                
                return response.redirect(`/admin`)
            }
            else {
                // login gagal
                return response.redirect(`/auth`)
            }
        }
        else {
            // data apoteker tidak ada
            return response.redirect(`/auth`)
        }
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// membuat function untuk logout
exports.logout = async (request, response) => {
    try {
        // menghapus data user dari session
        request.session.dataUser = undefined

        // kembali kehalaman login
        return response.redirect(`/auth`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
} 