/** controller file contains logic function for
 * accepting requests from user and giving responses
 * to user.
 * 
 * if controller needs to manage data in database,
 * it has to load model's file first.
 */

/** load model's file of obat */
const memberModel = require(`../models/member.model`)

/** -------------------------------------
 * create function to handle request
 * with url: /obat/ with method GET
 */
exports.showDataMember = async (request, response) => {
    try {
        /** get data obat using model */
        let dataMember = await memberModel.findAll()

        /** send data to view */
        let sendData = {
            page: `member`,
            data: dataMember,
            dataUser : request.session.dataUser
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
 * with url: /obat/add with method GET
 */

 exports.showAddPage = (request, response) => {
    let sendData = {
        page: `form-member`, // page that will be show
        /** set empty data because this is add feature */
        nama_member: ``,
        alamat: ``,
        telepon: ``,
        /** set target route for submit filled data */
        targetRoute: `/member/add`,
        dataUser : request.session.dataUser
    }

    /** set view page for this function */
    return response.render(`../views/index`, sendData)
}

/** -------------------------------------
 * create function to handle request
 * with url: /obat/add with method POST
 */

 exports.processInsert = async (request, response) => {
    try {
        /** reading obat's data from user that has sent */
        let newMember = {
            nama_member: request.body.nama_member,
            alamat: request.body.alamat,
            telepon: request.body.telepon,        }

        /** call function for insert to table of obat */
        await memberModel.add(newMember)

        /** redirect to obat's page */
        return response.redirect(`/member`)

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
    let selectedData = await memberModel.findByCriteria(parameter)

    /** prepare data to send to view page  */
    let sendData = {
        page: `form-member`, // page that will be show
        /** set each data based on data that will be change */
        nama_member: selectedData[0].nama_member,
        alamat: selectedData[0].alamat,
        telepon: selectedData[0].telepon,        /** set target route for submit filled data */
        targetRoute: `/member/edit/${selectedID}`,
        dataUser : request.session.dataUser
    }

    /** set view page for this function */
    return response.render(`../views/index`, sendData)

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
        let newMember = {
            nama_member: request.body.nama_member,
            alamat: request.body.alamat,
            telepon: request.body.telepon,
        }

        /** call function for update to table of obat */
        await memberModel.update(newMember, parameter)

        /** redirect to obat's page */
        return response.redirect(`/member`)

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
        await memberModel.delete(parameter)

        /** redirect to obat's page */
        return response.redirect(`/member`)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}


