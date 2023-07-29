// panggil model member
const memberModel = require(`../models/member.model`)
const { response, request } = require("../routes/member.route")

// request -> melihat data member
// response -> menampilkan data member melalui view

exports.showDataMember = async (request, response) => {
    try {
        // ambil data member menggunakan model
        let dataMember = await memberModel.ambilDataMember()
        // passing ke view
        let sendData = {
            page: `member`,
            data: dataMember
        }
        return response.render(`../views/index`, sendData)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// fungsi utk menampilkan form-member utk tambah data
exports.showTambahMember = async (request,response) => {
    try {
        // prepare data yang akan di passing ke view
        let sendData = {
            nama_member: ``,
            alamat: ``,
            telepon: ``,
            page: `form-member`,
            targetRoute: `/member/add`,
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

// fungsi utk memproses data member baru
exports.prosesTambahData = async (request,response) => {
    try {
        // membaca data dari yg diisikan user
        let newData = {
            nama_member: request.body.nama_member,
            alamat: request.body.alamat,
            telepon: request.body.telepon
        }
       await memberModel.tambahMember(newData)
    //    redirect ke tampilan data member
       return response.redirect(`/member`)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// fungsi utk menampilkan data member yg akan diubah
exports.showEditMember = async(request, response) => {
    try {
        // mendapatkan id dari member yg akan diubah
        let id= request.params.id

        // menampung id ke dalam obejct
        let parameter = {
            id: id
        }

        // ambil data sesuai parameter
        let member = await memberModel.ambilDataDenganParameter(parameter)

        // prepare ata yg akan itampilkan view
        let sendData = {
            nama_member: member[0].nama_member,
            alamat: member[0].alamat,
            telepon: member[0].telepon,
            page: `form-member`,
            targetRoute: `/member/edit/${id}`,
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
            nama_member: request.body.nama_member,
            alamat: request.body.alamat,
            telepon: request.body.telepon
        }

        // eksekusi perubahan data
        await memberModel.ubahMember(perubahan, parameter)

        // direct ke tampilan data member
        return response.redirect('/member')
        
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
       await memberModel.hapusmember(parameter)
       return response.redirect(`/member`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}