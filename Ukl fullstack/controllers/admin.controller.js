// panggil model admin
const adminModel = require(`../models/admin.model`)


// memanggil file crypt.js
const crypt = require(`../crypt`)

// request -> melihat data admin
// response -> menampilkan data admin melalui view

exports.showDataadmin = async (request, response) => {
    try {
        // ambil data admin menggunakan model
        let dataadmin = await adminModel.ambilDataadmin()
        // passing ke view
        let sendData = {
            page: `admin`,
            data: dataadmin,
            dataUser: request.session.dataUser
        }
        return response.render(`../views/index`, sendData)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// fungsi utk menampilkan form-admin utk tambah data
exports.showTambahadmin = async (request, response) => {
    try {
        // prepare data yang akan di passing ke view
        let sendData = {
            nama_admin: ``,
            username: ``,
            password: ``,
            page: `form-admin`,
            targetRoute: `/admin/add`,
            dataUser: request.session.dataUser,
            deskripsi: crypt.deskripsi
        }
        return response.render(`../views/index`, sendData)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// fungsi utk memproses data admin baru
exports.prosesTambahData = async (request, response) => {
    try {
        // membaca data dari yg diisikan user
        let newData = {
            nama_admin: request.body.nama_admin,
            username: request.body.username,
            password: crypt.enkripsi(request.body.password)
        }
        await adminModel.tambahAdmin(newData)
        //    redirect ke tampilan data admin
        return response.redirect(`/admin`)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// fungsi utk menampilkan data admin yg akan diubah
exports.showEditadmin = async (request, response) => {
    try {
        // mendapatkan id dari admin yg akan diubah
        let id = request.params.id

        // menampung id ke dalam obejct
        let parameter = {
            id: id
        }

        // ambil data sesuai parameter
        let admin = await adminModel.ambilDataDenganParameter(parameter)

        // prepare ata yg akan itampilkan view
        let sendData = {
            nama_admin: admin[0].nama_admin,
            username: admin[0].username,
            password: admin[0].password,
            page: `form-admin`,
            targetRoute: `/admin/edit/${id}`,
            deskripsi: crypt.deskripsi,
            dataUser: request.session.dataUser
        }

        return response.render(`../views/index`, sendData)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}
// fungsi utk memproses data yang diedit
exports.prosesUbahData = async (request, response) => {
    try {
        // mendapatkan id yang diubah
        let id = request.params.id

        // membungkus id ke bentuk object
        let parameter = {
            id: id
        }

        // menampung perubahan data ke dalam object
        let perubahan = {
            nama_admin: request.body.nama_admin,
            username: request.body.username,
            password: crypt.enkripsi(request.body.password)
        }

        // eksekusi perubahan data
        await adminModel.ubahAdmin(perubahan, parameter)

        // direct ke tampilan data admin
        return response.redirect('/admin')

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// fungsi untuk menghapus data
exports.prosesHapusData = async (request,response) => {
    try {
       let id = request.params.id

       let parameter = {
        id:id
       }
       await adminModel.hapusAdmin(parameter)
       return response.redirect(`/admin`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}