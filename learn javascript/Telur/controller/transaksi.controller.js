// memamnggil model obat
const telurModel = require(`../models/telur.model`)

const packModel = require(`../models/pack.model`)

// memanggil model customer
const memberModel = require(`../models/member.model`)
const { request, response } = require("express")

// memanggil model customer
const transaksiModel = require(`../models/transaksi.model`)

// memanggil model detail_transaksi
const detailModel = require(`../models/detail_transaksi.model`)

// membuat function menampilkan form transakasi
exports.showFromTransaksi = async (request, response) => {
    try {
        // ambil data obat
        let telur = await telurModel.findAll()

        let pack = await packModel.findAll()

        // ambil data customer
        let member = await memberModel.findAll()

        // prepare data yang akan dipassing ke view
        let sendData = {
            dataTelur : telur,
            dataPack : pack,
            dataMember: member,
            page:`form-transaksi`,
            tgl_transaksi : ``,
            dataTelurString : JSON.stringify(telur),
            dataPackString : JSON.stringify(pack),
            dataUser: request.session.dataUser,
            cart : request.session.cart

        }
        return response.render(`../views/index`,sendData)
        
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// membuat fungsi untuk menambahkan obat ke keranjang
exports.addToCart = async (request, response) => {
    try {
        // dapetin data obat berdasarkan id_obat yang dikirimkan
        let selectedTelur = await telurModel.findByCriteria({
            id: request.body.id_telur
        })

        let selectedPack = await packModel.findByCriteria({
            id: request.body.id_pack
        })
        // tampung data yang dikirimkan dari pilih obat
        let storeData = {
            id_telur : request.body.id_telur,
            id_pack : request.body.id_pack,
            jenis_telur : selectedTelur[0].jenis_telur,
            nama_pack : selectedPack[0].nama_pack,
            jumlah_telur : request.body.jumlah_telur,
            jumlah_pack : request.body.jumlah_pack,
            harga_telur : request.body.harga_telur,
            harga_pack : request.body.harga_pack
        }

        // masukkan data ke keranjang menggunakan session
        request.session.cart.push(storeData)
        // push() -> menambah data ke dalam array

        // dirrect ke halaman form-transaksi
        return response.redirect(`/transaksi/add`)


    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// membuat finction untuk menghapus data pada item keranjang
exports.hapusCart = async (request, response) => {
    try {
        // ambil seluruh data cart pada session
        let cart = request.session.cart

        // ambil id_obat yang akan dihapus dari cart
        let id_telur = request.params.id

        let id_pack = request.params.id


        // cari tau posisi index dari data yang akan dihapus
        let index = cart.findIndex(item => item.id_telur == id_telur)

        let index1 = cart.findIndex(item => item.id_pack == id_pack)

        // hapus data sesuai data yang ditemukan
        cart.splice(index, 1)

        cart.splice(index1, 1)

        // splice digunakan menghapus data pada array

        // kembalikan lagi data cart nya ke dalam session
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

// functiom untuk menyimpan data transaksi
exports.simpanTransaksi = async (request, response) => {
    try {
        // tampung data yang dikirimkan
        let newTransaksi = {
            tgl_transaksi: request.body.tgl_transaksi,
            id_member: request.body.id_member,
            id_admin:request.session.dataUser.id
        }

        // simpan transaksi
        let resultTransaksi = await transaksiModel.add(newTransaksi)
        
        // menampung isi cart
        let cart = request.session.cart

        for (let i = 0; i < cart.length; i++) {
            // hapus dulu key nama obat dari cart nya
            delete cart[i].jenis_telur

            delete cart[i].nama_pack

            // tambahi key id transaksi ke dalam cart 
            cart[i].id_transaksi = resultTransaksi.insertId

            // simpan cart ke  detial transaksi
            await detailModel.add(cart[i])
        }

        // hapus cart
        request.session.cart = []

        // direct ke halaman transaksi lagi
        return response.redirect(`/transaksi/add`)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// membuat fungsi untk menampikan data transaksi
exports.showTransaksi = async(request, response) => {
    try {
        // ambil data transaksi
        let transaksi = await transaksiModel.findAll()

        // sisipin data detail dari transaksi
        for (let i = 0; i< transaksi.length; i++) {
        
            // ambil id transaksi
            let id = transaksi[i].id

            // ambil data detailnya sesuai id
            let detail = await detailModel.findByCriteria({id_transaksi:id})

            // sisipin detail ke transaksinya 
            transaksi[i].detail = detail
        }

        // priper data yang dikirimkan ke view
        let sendData = {
            page:`transaksi`,
            dataUser:request.session.dataUser,
            transaksi:transaksi
        }
        return response.render(`../views/index`, sendData)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** membuat function uynuk menghapus data transaksi */
exports.hapusTransaksi = async(request, response) => {
    try {
        /** menampung sata id yang akan dihapus */
        let id = request.params.id

        /** menghapus data detail transaksinya */
        await detailModel.delete({id_transaksi : id})

        /** menghapus data transaksi */
        await transaksiModel.delete({id : id})

        /** kembali lagi ke halaman transaksi */
        return response.redirect(`/transaksi`)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

