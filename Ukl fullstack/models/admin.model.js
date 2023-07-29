const connection = require(`../config`)
// function untuk ambil data admin
exports.ambilDataadmin = () => {
    return new Promise((resolve, reject) => {
        // bikin query untuk ambil data
        let query = `select * from admin`

        // jalanlkan query-nya
        connection.query(query, (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result)
        })
    })
}

// function untuk ambil data berdasarkan parameter khusus 
exports.ambilDataDenganParameter = (parameter) => {
    return new Promise((resolve, reject) => {
        let params = Object
            .keys(parameter)
            .map(item => `${item}="${parameter[item]}"`)
            .join(` and `)

        let query = `select * from admin where ${params}`


        // jalankan query-nya
        connection.query(query, (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result)
        }) 
    })
}


// function untuk menambah data admin
exports.tambahAdmin = (admin) => {
    return new Promise((resolve,reject) => {
        // ambil data key dari object admin
        let key = Object
            .keys(admin) //[key1,key2,dst]
            .join() // "key1,key2,dst"

        // ambil value dari object admin
        let value = Object
            .keys(admin)//[key1,key2,dst]
            .map(item => `"${admin[item]}"`)
            .join()

        let query = `insert into admin (${key}) values (${value})`
        console.log(query);

        connection.query(query, (error, result) => {
            if (error) {
                reject(error)
                console.log(error);
            }
            resolve(result)
        })
    })
}



// buat fungsi utk update data admin
exports.ubahAdmin = (data, parameter) => {
    return new Promise((resolve, reject) => {
        /**menyusun utk query bagian 
         * perubahan data
         */
        let perubahanData = Object
        .keys(data) /**[admin,username,password] */
        .map(item => `${item}="${data[item]}"`)
        .join()


        // menyusun string untuk query bagian
        // penentu data yang akan di ubah
        let params = Object
            .keys(parameter)
            .map(item => `${item}="${parameter[item]}"`)
            .join(` and `)


            // susun query
            let query= `update admin set ${perubahanData} where ${params}`
            connection.query(query,(error,result) => {
                if(error){
                    reject(error.message)
                }
                resolve(result)
            })
    })
}

// membuat fungsi untuk menghapus data admin
exports.hapusAdmin = (parameter) => {
    return new Promise ((resolve,rejected) => {
        let params = Object
        .keys(parameter)
        .map(item => `${item} = "${parameter[item]}"`)
        .join(` and `)


        let query = `delete from admin where ${params}`

        connection.query(query,(error,result) => {
            if(error){
                rejected(error.message)
            }
            resolve(result)
        })
    })
}