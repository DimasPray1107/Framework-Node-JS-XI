/** controller file contains logic function for
 * accepting requests from user and giving responses
 * to user.
 * 
 * if controller needs to manage data in database,
 * it has to load model's file first.
 */

/** load model's file of obat */
const obatModel = require(`../models/obat.model`)

/** -------------------------------------
 * create function to handle request
 * with url: /obat/ with method GET
 */
exports.showDataObat = async (request, response) => {
    try {
        /** get data obat using model */
        let dataObat = await obatModel.findAll()

        /** send data to view */
        let sendData = {
            page: `obat`,
            data: dataObat,
            // passing data user yg login
            // dari session

            dataUser: request.session.dataUser
        }

        /** set view page for this function */
        return response.render(`../views/index`, sendData)
        
    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}
/** -------------------------------------
 * create function to handle request
 * with url: /obat/delete with method GET
 */

 exports.processDelete = async (request, response) => {
    try {
        /** read selected ID from URL parameter */
        let selectedID = request.params.id

        /** store selected ID to object "parameter" */
        let parameter = {
            id: selectedID // 'id' is similar as column's name of table
        }

        /** call function for delete data table of obat */
        await obatModel.delete(parameter)

        /** redirect to obat's page */
        return response.redirect(`/obat`)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}
/** -------------------------------------
 * create function to handle request
 * with url: /obat/edit with method POST
 */

 exports.processUpdate = async (request, response) => {
    try {
        /** read selected ID from URL parameter */
        let selectedID = request.params.id

        /** store selected ID to object "parameter" */
        let parameter = {
            id: selectedID // 'id' is similar as column's name of table
        }

        /** reading obat's data from user that has sent */
        let newObat = {
            nama_obat: request.body.nama_obat,
            expired_date: request.body.expired_date,
            harga: request.body.harga,
            stok: request.body.stok,
            jenis: request.body.jenis
        }

        /** call function for update to table of obat */
        await obatModel.update(newObat, parameter)

        /** redirect to obat's page */
        return response.redirect(`/obat`)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}



/** -------------------------------------
 * create function to handle request
 * with url: /obat/add with method POST
 */

 exports.processInsert = async (request, response) => {
    try {
        /** reading obat's data from user that has sent */
        let newObat = {
            nama_obat: request.body.nama_obat,
            expired_date: request.body.expired_date,
            harga: request.body.harga,
            stok: request.body.stok,
            jenis: request.body.jenis
        }

        /** call function for insert to table of obat */
        await obatModel.add(newObat)

        /** redirect to obat's page */
        return response.redirect(`/obat`)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** -------------------------------------
 * create function to handle request
 * with url: /obat/add with method GET
 */

 exports.showAddPage = (request, response) => {
    let sendData = {
        page: `form-obat`, // page that will be show
        /** set empty data because this is add feature */
        nama_obat: ``,
        expired_date: new Date(), // set current time
        harga: ``,
        stok: ``,
        jenis: ``,
        /** set target route for submit filled data */
        targetRoute: `/obat/add`,
        dataUser: request.session.dataUser
    }

    /** set view page for this function */
    return response.render(`../views/index`, sendData)
}

/** -------------------------------------
 * create function to handle request
 * with url: /obat/edit/ID with method GET
 */

 exports.showEditPage = async (request, response) => {
    /** read selected ID from URL parameter */
    let selectedID = request.params.id

    /** store selected ID to object "parameter" */
    let parameter = {
        id: selectedID // 'id' is similar as column's name of table
    }

    /** call function for get data from database based on seleced id */
    let selectedData = await obatModel.findByCriteria(parameter)

    /** prepare data to send to view page  */
    let sendData = {
        page: `form-obat`, // page that will be show
        /** set each data based on data that will be change */
        nama_obat: selectedData[0].nama_obat,
        expired_date: selectedData[0].expired_date,
        harga: selectedData[0].harga,
        stok: selectedData[0].stok,
        jenis: selectedData[0].jenis,
        /** set target route for submit filled data */
        targetRoute: `/obat/edit/${selectedID}`,
        dataUser: request.session.dataUser
    }

    /** set view page for this function */
    return response.render(`../views/index`, sendData)

}