const md5 = require("md5")

/** load model for `admin` table */
const adminModel = require(`../models/index`).admin
/** load Operation from Sequelize */
const Op = require(`sequelize`).Op

/** create function for read all data */
exports.getAlladmin = async (request, response) => {
    /** call findAll() to get all data */
    let admin = await adminModel.findAll()
    return response.json({
        success: true,
        data: admin,
        message: `All admin have been loaded`
    })
}

/** create function for filter */
exports.findadmin = async (request, response) => {
    /** define keyword to find data */
    let keyword = request.body.keyword
    /** call findAll() within where clause and operation
    * to find data based on keyword */
    let admin = await adminModel.findAll({
        where: {
            [Op.or]: [
                { name: { [Op.substring]: keyword } },
                { contact: { [Op.substring]: keyword } },
                { address: { [Op.substring]: keyword } },
                { username: { [Op.substring]: keyword } },
                { password: { [Op.substring]: keyword } }
            ]
        }
    })
    return response.json({
        success: true,
        data: admin,
        message: `All admin have been loaded`
    })
}

/** create function for add new admin */
exports.addadmin = (request, response) => {
    /** prepare data from request */
    let newadmin = {
        name: request.body.name,
        contact: request.body.contact,
        address: request.body.address,
        username: request.body.username,
        password: md5(request,response)
    }
    /** execute inserting data to admin's table */
    adminModel.create(newadmin)
        .then(result => {
            /** if insert's process success */
            return response.json({
                success: true,
                data: result,
                message: `New admin has been inserted`
            })
        })
        .catch(error => {
            /** if insert's process fail */
            return response.json({
                success: false,
                message: error.message
            })
        })
}


/** create function for update admin */
exports.updateadmin = (request, response) => {
    /** prepare data that has been changed */
    let dataadmin = {
        name: request.body.name,
        contact: request.body.contact,
        address: request.body.address,
        username: request.body.username,
        password: md5(request,response)
       }
    /** define id admin that will be update */
    let idadmin = request.params.id
    /** execute update data based on defined id admin */
    adminModel.update(dataadmin, { where: { id: idadmin } })
        .then(result => {
            /** if update's process success */
            return response.json({
                success: true,
                message: `Data admin has been updated`
            })
        })
        .catch(error => {
            /** if update's process fail */
            return response.json({
                success: false,
                message: error.message
            })
        })
}

/** create function for delete data */
exports.deleteadmin = (request, response) => {
    /** define id admin that will be update */
    let idadmin = request.params.id
    /** execute delete data based on defined id admin */
    adminModel.destroy({ where: { id: idadmin } })
        .then(result => {
            /** if update's process success */
            return response.json({
                success: true,
                message: `Data admin has been updated`
            })
        })
        .catch(error => {
            /** if update's process fail */
            return response.json({
                success: false,
                message: error.message
            })
        })
}