// fungtion untuk CRUD

// load dulu connection dari config
const connection = require(`../config`)

// function untuk ambil ddata customer
exports.ambilDataCustomer = () => {
    return new Promise((resolve, reject) => {
        // bikin query untuk ambil data
        let query = `select * from customer`

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

        let query = `select * from customer where ${params}`
        
        connection.query(query, (error, result) => {
            if (error){
                reject(error)
            }
            resolve(result)
        })
    })
}
// function utk menambahkan data customer baru
exports.tambahCustomer = (customer) => {
    return new Promise((resolve, reject) => {
     // ambil key dari object customer
     let key = Object
     .keys(customer) //key1,key2,dst]
     .join() // "key1,key2,dst"

    //  ambil value dari object customer
    let value = Object
    .keys(customer) // key1,key2,dsdt
    .map(item => `"${customer[item]}"`)
    // ["value1","value2",dst]
    .join()// "value1","value2",dst

    let query = `insert into customer (${key}) values (${value})`
    connection.query(query, (error, result) => {
        if (error){
            reject(error)
        }
        resolve(result)
    })
})
}

// buat fungsi untuk  update data customer
exports.ubahCustomer = (data, parameter) => {
    return new Promise((resolve, reject) => {
        // menyusun string utk query bagian perubahan data
        let perubahanData = Object
        .keys(data) // [nama_customer, alamat]
        .map(item => `${item}="${data[item]}"`)
        .join()

        // menyusun string tuk query bagian penentu data yg akan diubah
        let params = Object
        .keys(parameter)
        .map(item => `${item}="${parameter[item]}"`)
        .join(` and `)

        // susun query
        let query = `update customer set ${perubahanData} where ${params}`

        // jalankan query
        connection.query(query, (error,result) => {
            if(error){
                reject(error)
            }
            resolve(result)
        })
    })
}