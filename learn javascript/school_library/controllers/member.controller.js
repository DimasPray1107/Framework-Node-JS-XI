/** load model for `Members` table */
const MemberModel = require(`../models/index`).member
/** load Operation from Sequelize */
const Op = require(`sequelize`).Op
// upload img
const upload = require(`./upload-profil`).single(`profil`)
// panggil member validation
// const memberValidation = require(`../middlewares/member-validation`)
/** create function for read all data */
exports.getAllMember = async (request, response) => {
    /** call findAll() to get all data */
    let Members = await MemberModel.findAll()
    return response.json({
        success: true,
        data: Members,
        message: `All Members have been loaded`
    })
}

/** create function for filter */
exports.findMember = async (request, response) => {
    /** define keyword to find data */
    let keyword = request.body.keyword
    /** call findAll() within where clause and operation
    * to find data based on keyword */
    let Members = await MemberModel.findAll({
        where: {
            [Op.or]: [
                { name: { [Op.substring]: keyword } },
                { gender: { [Op.substring]: keyword } },
                { address: { [Op.substring]: keyword } }
            ]
        }
    })
    return response.json({
        success: true,
        data: Members,
        message: `All Members have been loaded`
    })
}

/** create function for add new Member */
exports.addMember = (request, response) => {
    // proses validasi data
    let resultvalidation = memberValidation (request)

    // jika status validasi data
    if (!resultvalidation.status) {
        return response.json({
            status: false,
            message: resultvalidation
        })

    }
    /** prepare data from request */
     /** run function upload */
     upload(request, response, async error => {
        /** check if there are errorwhen upload */
        if (error) {
            return response.json({ message: error })
        }
        /** check if file is empty */
        if (!request.file) {
            return response.json({
                message: `Nothing to Upload`
            })
        }
    
        let newMember = {
            name: request.body.name,
            gender: request.body.gender,
            contact: request.body.contact,
            address: request.body.address,
            profil: request.file.filename
          
        }
        /** execute inserting data to Member's table */
        MemberModel.create(newMember)
            .then(result => {
                /** if insert's process success */
                return response.json({
                    success: true,
                    data: result,
                    message: `New Member has been inserted`
                })
            })
            .catch(error => {
                /** if insert's process fail */
                return response.json({
                    success: false,
                    message: error.message
                })
            })
    })

}

/** create function for update Member */
/** create function to update Member */
exports.updateMember = async (request, response) => {
    /** run upload function */
    upload(request, response, async error => {
        /** check if there are error when upload */
        if (error) {
            return response.json({ message: error })
        }
        /** store selected Member ID that will update */
        let id = request.params.id
        /** prepare Member's data that will update */
        let Member = {
            name: request.body.name,
            gender: request.body.gender,
            contact: request.body.contact,
            address: request.body.address
        }
        /** check if file is not empty,
        * it means update data within reupload file
        */
        if (request.file) {
            /** get selected Member's data */
            const selectedMember = await MemberModel.findOne({
                where: { id: id }
            })
            /** get old filename of profil file */
            const oldprofilMember = selectedMember.profil
            /** prepare path of old profil to delete file */
            const pathprofil = path.join(__dirname, `../profil`,
                oldprofilMember)
            /** check file existence */
            if (fs.existsSync(pathprofil)) {
                /** delete old profil file */
                fs.unlink(pathprofil, error =>
                    console.log(error))
            }
            /** add new profil filename to Member object */
            Member.profil = request.file.filename
        }
        /** execute update data based on defined id Member */
        MemberModel.update(Member, { where: { id: id } })
            .then(result => {
                /** if update's process success */
                return response.json({
                    success: true,
                    message: `Data Member has been updated`
                })
            })
            .catch(error => {
                /** if update's process fail */
                return response.json({
                })
            })
    })
}


/** create function for delete data */
exports.deleteMember = (request, response) => {
    /** define id Member that will be update */
    let idMember = request.params.id
    /** execute delete data based on defined id Member */
    MemberModel.destroy({ where: { id: idMember } })
        .then(result => {
            /** if update's process success */
            return response.json({
                success: true,
                message: `Data Member has been updated`
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

/** create function for return borrowed book */
exports.returnBook = async (request, response) => {
    /** prepare borrowID that will be return */
    let borrowID = request.params.id
    /** prepare current time for return's time */
    let today = new Date()
    let currentDate = `${today.getFullYear()}-${today.getMonth()
        + 1}-${today.getDate()}`
    /** update status and date_of_return from borrow's data */
    borrowModel.update(
        {
            date_of_return: currentDate,
            status: true
        },
        {
            where: { id: borrowID }
        }
    )
        .then(result => {
            return response.json({
                success: true,
                message: `Book has been returned`
            })
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            })
        })
}

/** create function for get all borrowing data */
exports.getMember = async (_request, response) => {
    let data = await borrowModel.findAll(
        {
            include: [
                `member`, `admin`,
                {
                    model: detailsOfBorrowModel,
                    as: `details_of_borrow`,
                    include: ["book"]
                }
            ]
        }
    )
    return response.json({
        success: true,
        data: data,
        message: `All borrowing borrow have been loaded`
    })
}


