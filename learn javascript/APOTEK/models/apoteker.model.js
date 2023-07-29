const connection = require(`../config`)
// function untuk ambil data apoteker
exports.ambilDataApoteker = () => {
    return new Promise((resolve, reject) => {
        // bikin query untuk ambil data
        let query = `select * from apoteker`

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

        let query = `select * from apoteker where ${params}`


        // jalankan query-nya
        connection.query(query, (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result)
        }) 
    })
}


// function untuk menambah data apoteker
exports.tambahApoteker = (apoteker) => {
    return new Promise((resolve,reject) => {
        // ambil data key dari object apoteker
        let key = Object
            .keys(apoteker) //[key1,key2,dst]
            .join() // "key1,key2,dst"

        // ambil value dari object apoteker
        let value = Object
            .keys(apoteker)//[key1,key2,dst]
            .map(item => `"${apoteker[item]}"`)
            .join()

        let query = `insert into apoteker (${key}) values (${value})`
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



// buat fungsi utk update data apoteker
exports.ubahApoteker = (data, parameter) => {
    return new Promise((resolve, reject) => {
        /**menyusun utk query bagian 
         * perubahan data
         */
        let perubahanData = Object
        .keys(data) /**[apoteker,username,password] */
        .map(item => `${item}="${data[item]}"`)
        .join()


        // menyusun string untuk query bagian
        // penentu data yang akan di ubah
        let params = Object
            .keys(parameter)
            .map(item => `${item}="${parameter[item]}"`)
            .join(` and `)


            // susun query
            let query= `update apoteker set ${perubahanData} where ${params}`
            connection.query(query,(error,result) => {
                if(error){
                    reject(error.message)
                }
                resolve(result)
            })
    })
}

// membuat fungsi untuk menghapus data apoteker
exports.hapusApoteker = (parameter) => {
    return new Promise ((resolve,rejected) => {
        let params = Object
        .keys(parameter)
        .map(item => `${item} = "${parameter[item]}"`)
        .join(` and `)


        let query = `delete from apoteker where ${params}`

        connection.query(query,(error,result) => {
            if(error){
                rejected(error.message)
            }
            resolve(result)
        })
    })
}