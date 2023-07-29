// load model apoteker
const apotekerModel = require(`../models/apoteker.model`)

// load crypt 
const crypt = require(`../crypt`)
const { request, response } = require("../routes/apoteker.route")



// function utk menampilkan halaman login
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
// function utk proses autentication 
exports.authentication = async (request, response) => {
    try {
        // tampung data username dan password
        let username = request.body.username
        let password = request.body.password

        // check kecocokan username
        let result = await apotekerModel.ambilDataDenganParameter({ username: username })

        // check keberadaaan data apoteker 
        if (result.length > 0) {
            // kita cek dulu kecocokan passwordnya
            // 123 === deskripsi(kksdandsasd)
            if (password === crypt.deskripsi(result[0].password)) {
                // login berhasil
                // menyimpan data user ke session
                
                // dataUser = laber of session
                request.session.dataUser = result [0]
                return response.redirect(`/obat`)
            } else {

                // login gagal
                return response.redirect(`/auth`)
            }
        } else {
            // data apoteker tidak ada
            return response.redirect(`../auth`)
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
        return reesponse.redirect(`/auth`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }

}