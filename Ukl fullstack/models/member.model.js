// fungtion untuk CRUD

// load dulu connection dari config
const connection = require(`../config`)

// function untuk ambil ddata member
exports.ambilDataMember = () => {
    return new Promise((resolve, reject) => {
        // bikin query untuk ambil data
        let query = `select * from member`

        // jalankan query nya
        
        connection.query(query, (error, result) => {
            if (error){
                reject(error)
            }
            resolve(result)
        })
    })
}

//function untuk ambil data berdasarkan parameter khusus
exports.ambilDataDenganParameter = (parameter) => {
    return new Promise((resolve, reject) => {
        let params = Object
        .keys(parameter)
        .map(item => `${item}="${parameter[item]}"`)
        .join(` and `)

        let query = `select * from member where ${params}`
        
        connection.query(query, (error, result) => {
            if (error){
                reject(error)
            }
            resolve(result)
        })
    })
}
// function utk menambahkan data member baru
exports.tambahMember = (member) => {
    return new Promise((resolve, reject) => {
     // ambil key dari object member
     let key = Object
     .keys(member) //key1,key2,dst]
     .join() // "key1,key2,dst"

    //  ambil value dari object member
    let value = Object
    .keys(member) // key1,key2,dsdt
    .map(item => `"${member[item]}"`)
    // ["value1","value2",dst]
    .join()// "value1","value2",dst

    let query = `insert into member (${key}) values (${value})`
    connection.query(query, (error, result) => {
        if (error){
            reject(error)
        }
        resolve(result)
    })
})
}

// buat fungsi untuk  update data member
exports.ubahMember = (data, parameter) => {
    return new Promise((resolve, reject) => {
        // menyusun string utk query bagian perubahan data
        let perubahanData = Object
        .keys(data) // [nama_member, alamat]
        .map(item => `${item}="${data[item]}"`)
        .join()

        // menyusun string tuk query bagian penentu data yg akan diubah
        let params = Object
        .keys(parameter)
        .map(item => `${item}="${parameter[item]}"`)
        .join(` and `)

        // susun query
        let query = `update member set ${perubahanData} where ${params}`

        // jalankan query
        connection.query(query, (error,result) => {
            if(error){
                reject(error)
            }
            resolve(result)
        })
    })
}

// membuat fungsi untuk menghapus data member
exports.hapusmember = (parameter) => {
    return new Promise ((resolve,rejected) => {
        let params = Object
        .keys(parameter)
        .map(item => `${item} = "${parameter[item]}"`)
        .join(` and `)


        let query = `delete from member where ${params}`

        connection.query(query,(error,result) => {
            if(error){
                rejected(error.message)
            }
            resolve(result)
        })
    })
}