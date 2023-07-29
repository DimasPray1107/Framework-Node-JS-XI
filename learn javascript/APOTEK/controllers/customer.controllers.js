// panggil model customer
const customerModel = require(`../models/customer.model`)
const { response, request } = require("../routes/customer.route")

// request -> melihat data customer
// response -> menampilkan data customer melalui view

exports.showDataCustomer = async (request, response) => {
    try {
        // ambil data customer menggunakan model
        let dataCustomer = await customerModel.ambilDataCustomer()
        // passing ke view
        let sendData = {
            page: `customer`,
            data: dataCustomer
        }
        return response.render(`../views/index`, sendData)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// fungsi utk menampilkan form-customer utk tambah data
exports.showTambahCustomer = async (request,response) => {
    try {
        // prepare data yang akan di passing ke view
        let sendData = {
            nama_customer: ``,
            alamat: ``,
            telepon: ``,
            page: `form-customer`,
            targetRoute: `/pelanggan/add`
        }
        return response.render(`..views/index`, sendData)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// fungsi utk memproses data customer baru
exports.prosesTambahData = async (request,response) => {
    try {
        // membaca data dari yg diisikan user
        let newData = {
            nama_customer: request.body.nama_customer,
            alamat: request.body.alamat,
            telepon: request.body.telepon
        }
       await customerModel.tambahCustomer(newData)
    //    redirect ke tampilan data pelanggan
       return response.redirect(`/pelanggan`)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// fungsi utk menampilkan data customer yg akan diubah
exports.showEditCustomer = async(request, response) => {
    try {
        // mendapatkan id dari customer yg akan diubah
        let id= request.params.id

        // menampung id ke dalam obejct
        let parameter = {
            id: id
        }

        // ambil data sesuai parameter
        let customer = await customerModel.ambilDataDenganParameter(parameter)

        // prepare ata yg akan itampilkan view
        let sendData = {
            nama_customer: customer[0].nama_customer,
            alamat: customer[0].alamat,
            telepon: customer[0].telepon,
            page: `form-customer`,
            targetRoute: `/pelanggan/edit/${id}`
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
            nama_customer: request.body.nama_customer,
            alamat: request.body.alamat,
            telepon: request.body.telepon
        }

        // eksekusi perubahan data
        await customerModel.ubahCustomer(perubahan, parameter)

        // direct ke tampilan data customer
        return response.redirect('/pelanggan')
        
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}