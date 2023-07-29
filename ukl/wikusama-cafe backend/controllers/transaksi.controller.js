/** load model of transaksi */
const transaksiModel = require(`../models/index`).transaksi

/** load model of detail transaksi */
const detailModel = require(`../models/index`).detail_transaksi

/** load model of menu */
const menuModel = require(`../models/index`).menu

/** create and export function to add transaksi */
exports.addTransaksi = async (request, response) => {
    try {
        /** prepare data to add in transaksi */
        let newTransaksi = {
            tgl_transaksi: request.body.tgl_transaksi,
            id_user: request.body.id_user,
            id_meja: request.body.id_meja,
            nama_pelanggan: request.body.nama_pelanggan,
            status: `belum_bayar`
        }

        /** execute add transaksi using model */    
        let insertTransaksi = await transaksiModel.create(newTransaksi)

        /** get the lates id of new transaksi */
        let latesID = insertTransaksi.id_transaksi

        /** insert last ID in each of detail */
        /** assume that arrDetail is array type */
        let arrDetail = request.body.detail_transaksi

        /** loop each arrDetail to insert last ID
         * and harga
         */
        for (let i = 0; i < arrDetail.length; i++) {
            arrDetail[i].id_transaksi = latesID

            /** get selected menu based on id_menu */
            let selectedMenu = await menuModel.findOne({
                where: { id_menu: arrDetail[i].id_menu }
            })

            /** add harga in each of detail */
            arrDetail[i].harga = selectedMenu?.harga
        }

        /** execute insert detail transaksi using model */
        /** bulkCreate => create dalam jumlah besar */
        await detailModel.bulkCreate(arrDetail)

        /** give a response */
        return response.json({
            status: true,
            message: `Data transaksi telah ditambahkan`
        })

    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}

/** create and export function to edit transaksi */
exports.updateTransaksi = async (request, response) => {
    try {
        /** get id that will be update */
        let id_transaksi = request.params.id_transaksi

        /** prepare data updated transakasi */
        let dataTransaksi = {
            tgl_transaksi: request.body.tgl_transaksi,
            id_user: request.body.id_user,
            id_meja: request.body.id_meja,
            nama_pelanggan: request.body.nama_pelanggan,
            status: request.body.status
        }

        /** execute update transaksi using model */
        await transaksiModel.update(
            dataTransaksi, { where: { id_transaksi: id_transaksi } }
        )

        /** execute delete all detail of selected transaksi */
        await detailModel.destroy({
            where: { id_transaksi: id_transaksi }
        })

        /** insert a new detail of transaksi */
        /** loop each arrDetail to insert last ID
         * and harga
         */
        let arrDetail = request.body.detail_transaksi
        for (let i = 0; i < arrDetail.length; i++) {
            arrDetail[i].id_transaksi = id_transaksi

            /** get selected menu based on id_menu */
            let selectedMenu = await menuModel.findOne({
                where: { id_menu: arrDetail[i].id_menu }
            })

            /** add harga in each of detail */
            arrDetail[i].harga = selectedMenu?.harga
        }

        /** insert new detail using model */
        await detailModel.bulkCreate(arrDetail)

        /** give a response */
        return response.json({
            status: true,
            message: `Data transaksai telah diubah`
        })

    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}

/** create and export function to delete transaksi */
exports.deleteTransaksi = async (request, response) => {
    try {
        /** get id that will be delete */
        let id_transaksi = request.params.id_transaksi

        /** execute delete detail using model */
        await detailModel.destroy({
            where: { id_transaksi: id_transaksi }
        })

        /** execute delete transaksi using model */
        await transaksiModel.destroy({
            where: { id_transaksi: id_transaksi }
        })

        /** give a response */
        return response.json({
            status: true,
            message: `Data transaksi telah dihapus`
        })

    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}

/** create and export function to get all transaksi */
exports.getTranskasi = async (request, response) => {
    try {
        /** get all data using model */
        let result = await transaksiModel
            .findAll({
                include: [
                    "meja",
                    "user",
                    {
                        model: detailModel,
                        as: "detail_transaksi",
                        include: ["menu"]
                    }
                ]
            })

        /** give a response */
        return response.json({
            status: true,
            data: result
        })

    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}