// memanggil model obat
const obatModel = require(`../models/obat.model`)

// memanggil model customer
const customerModel = require(`../models/customer.model`)

// memanggil modelnya transaksi
const transaksiModel = require(`../models/transaksi.model`)

// memanggil model detail transaksi
const detailModel = require(`../models/detail_transaksi.model`)
const { request, response } = require("../routes/apoteker.route")
// function utk menampilkan form transaksi
exports.showFormTransaksi = async (request, response) => {
    try {
        // ambil data obat
        let obat = await obatModel.findAll()

        // ambil data vustomer
        let customer = await customerModel.ambilDataCustomer()

        // prepare data yg akan dipassing ke view
        let sendData = {
            dataObat: obat, // array object
            dataCustomer: customer,
            page: `form-transaksi`,
            no_faktur: ``,
            tgl_transaksi: ``,
            dataObatString: JSON.stringify(obat), // string
            //JavaScriptObjectNotation = JSON
            dataUser: request.session.dataUser,
            cart: request.session.cart
        }
        return response.render(`../views/index`, sendData)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// membuat fungsi utk menambahkan oba ke keranjang
exports.addToCart = async (request, response) => {
    try {
        // dapetin data obat berdasarkan id_obat yg dikirimkan

        let selectedObat = await obatModel.findByCriteria({
            id: request.body.id_obat
        })

        // tampung / receive data yg dikirimkan
        let storeData = {
            id_obat: request.body.id_obat,
            nama_obat: selectedObat[0].nama_obat,
            jumlah_beli: request.body.jumlah_beli,
            harga_beli: request.body.harga_beli
        }

        // masukan data ke keranjang menggunakan session
        request.session.cart.push(storeData)
        // push() -> menambahkan data ke dalam array

        // direct ke kalaman form-transaksi
        return response.redirect(`/transaksi/add`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// function untuk menghapus data item pada cant (keranjang)
exports.hapusCart = async (request, response) => {
    try {
        // ambil seluruh data cart pada session
        let cart = request.session.cart

        // ambil id obat yanng akan dihapus dari cart
        let id_obat = request.params.id

        // cari tau posisi oindex dari data yang akan dihapus
        let index = cart.findIndex(item => item.id_obat == id_obat)

        // hapus data sesuai indexx yang ditemukan
        cart.splice(index, 1)
        // splice digunakan untuk mengapus data dalam array

        // kembalikan data cart ke  dalam sebuah sesion
        request.session.cart = cart

        // direct ke halaman form transaksi
        return response.redirect(`/transaksi/add`)


    } catch (error) {

        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// menyimpan data transaksi
exports.simpanTransaksi = async (request, response) => {
    try {
        // tampung data yng dikirimkan
        let newTransaksi = {
            no_faktur: request.body.no_faktor,
            tgl_transaksi: request.body.tgl_transaksi,
            id_customer: request.body.id_customer,
            id_apoteker: request.session.dataUser.id
        }

        // simpan transaksi
        let resultTransaksi =
            await transaksiModel.add(newTransaksi)

        // menampung isi cart
        let cart = request.session.cart
        for (let i = 0; i < cart.length; i++) {
            //    hapus data/key nama_obat dari cart
            delete cart[i].nama_obat

            // tambahi key id_transaksi ke dlm cart
            cart[i].id_transaksi = resultTransaksi.insertId

            // eksekusi siman cart ke detail_transaksi
            await detailModel.add(cart[i])
        }
        // hapus cartnya
        request.session.cart = []
        // direct ke halman form transaksi lgi
        return response.redirect(`/transaksi/add`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// menampilkan data transaksi
exports.showTransaksi = async (request, response) => {
    try {
        // ambil data transaksi 
        let transaksi = await transaksiModel.findAll()

        // sisipin data detail dri detiap transaksi
        for (let i = 0; i < transaksi.length; i++) {
            //    ambil id transaksi
            let id = transaksi[i].id
            // ambil data detail sesuai id
            let detail = await detailModel.findByCriteria({ id_transaksi: id })
            // sisipin detail ke transaksinya
            transaksi[i].detail = detail
        }

        // prepare data yang akan dikirimkan ke view
        let sendData = {
            page: `transaksi`,
            dataUser: request.session.dataUser,
            transaksi: transaksi,

        }

        return response.render(`../views/index`, sendData)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// function utk menghapus data transaksi
exports.hapusTransaksi = async (request, response) => {
    try {
        // menampung data id yang akan dihapus
        let id = request.params.id
        
        // menghapus data detail transaksinya terlebih dahulu
        await detailModel.delete({id_transaksi: id})

        // menghapus data transaksinya
        await transaksiModel.delete({id: id})

        //redirect ke transaksi/kembali ke halaman transaksi
        return response.redirect(`/transaksi`)

    } catch (error) { 
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}