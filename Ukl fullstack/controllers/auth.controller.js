/** load model apoteker */
const adminModel = require(`../models/admin.model`)
/** load crypt */
const crypt = require(`../crypt`)

/** function untk menampilkan halaman logic */
exports.showLogin = async (request, response) => {
    try {
        return response.render(`../views/pages/login`)
    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** function untuk proses authentication */
exports.authentication = async (request, response) => { 
    try {
        /** tampung data username & password */
        let username = request.body.username
        let password = request.body.password

        /** cek username & password */
        let result = await adminModel.ambilDataDenganParameter({username:username})

        /** cek keberadaan data aapoteker */
        if(result.length > 0) { 
            /** cek kecocokan password nya  
             * 123 === deskripsi(awdokawodoawkdoawkd) = benar maka login berhasil
             * "===" compare value & tipe data
            */
            if (password === crypt.deskripsi(result[0].password)) {
                /** login berhasil 
                 * menyimpan data user ke session 
                */
                request.session.dataUser = result[0]
                request.session.cart = []

                return response.redirect(`/admin`)
            } else {
                /** login gagal */
                return response.redirect(`/auth`)
            }
        } else {    
            return response.redirect(`/auth`)
        }
    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// Membuat function untuk logout
exports.logout = async (request, response) => { 
    try {
        /** menghapus data user dari sesion */
        request.session.dataUser = undefined // undefined = kosong

        return response.redirect(`/auth`)
    } catch (error) {
         /** handling error */
         let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}