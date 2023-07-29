/** controller file contains logic function for
 * accepting requests from user and giving responses
 * to user.
 * 
 * if controller needs to manage data in database,
 * it has to load model's file first.
 */

/** load model's file of telur */
const telurModel = require(`../models/telur.model`)

/** -------------------------------------
 * create function to handle request
 * with url: /telur/ with method GET
 */
exports.showDataTelur = async (request, response) => {
    try {
        /** get data telur using model */
        let dataTelur = await telurModel.findAll()

        /** send data to view */
        let sendData = {
            page: `telur`,
            data: dataTelur
            // passing data user yg login
            // dari session

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
 * with url: /telur/delete with method GET
 */

 exports.processDelete = async (request, response) => {
    try {
        /** read selected ID from URL parameter */
        let selectedID = request.params.id

        /** store selected ID to object "parameter" */
        let parameter = {
            id: selectedID // 'id' is similar as column's name of table
        }

        /** call function for delete data table of telur */
        await telurModel.delete(parameter)

        /** redirect to telur's page */
        return response.redirect(`/telur`)

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
 * with url: /telur/edit with method POST
 */

 exports.processUpdate = async (request, response) => {
    try {
        /** read selected ID from URL parameter */
        let selectedID = request.params.id

        /** store selected ID to object "parameter" */
        let parameter = {
            id: selectedID // 'id' is similar as column's name of table
        }

        /** reading telur's data from user that has sent */
        let newtelur = {
            jenis_telur: request.body.jenis_telur,
            harga: request.body.harga,
            stok: request.body.stok,
        }

        /** call function for update to table of telur */
        await telurModel.update(newtelur, parameter)

        /** redirect to telur's page */
        return response.redirect(`/telur`)

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
 * with url: /telur/add with method POST
 */

 exports.processInsert = async (request, response) => {
    try {
        /** reading telur's data from user that has sent */
        let newTelur = {
            jenis_telur: request.body.jenis_telur,
            harga: request.body.harga,
            stok: request.body.stok,
            
        }

        /** call function for insert to table of telur */
        await telurModel.add(newTelur)

        /** redirect to telur's page */
        return response.redirect(`/telur`)

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
 * with url: /telur/add with method GET
 */

 exports.showAddPage = (request, response) => {
    let sendData = {
        page: `form-telur`, // page that will be show
        /** set empty data because this is add feature */
        jenis_telur: ``,
        harga: ``,
        stok: ``,
        targetRoute: `/telur/add`,
        dataUser: request.session.dataUser
     
    }

    /** set view page for this function */
    return response.render(`../views/index`, sendData)
}

/** -------------------------------------
 * create function to handle request
 * with url: /telur/edit/ID with method GET
 */

 exports.showEditPage = async (request, response) => {
    /** read selected ID from URL parameter */
    let selectedID = request.params.id

    /** store selected ID to object "parameter" */
    let parameter = {
        id: selectedID // 'id' is similar as column's name of table
    }

    /** call function for get data from database based on seleced id */
    let selectedData = await telurModel.findByCriteria(parameter)

    /** prepare data to send to view page  */
    let sendData = {
        page: `form-telur`, // page that will be show
        /** set each data based on data that will be change */
        jenis_telur: selectedData[0].jenis_telur,
        harga: selectedData[0].harga,
        stok: selectedData[0].stok,
        targetRoute: `/telur/edit/${selectedID}`,

        /** set target route for submit filled data */
   
    }

    /** set view page for this function */
    return response.render(`../views/index`, sendData)

}