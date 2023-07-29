// memanggil library crypto-js
const crypto = require( `crypto-js` )

// membuat fungtion untuk enkripsi
exports.enkripsi = (plainText) => {
    // bikin secret key
    let secretkey = `YTTA`

    // proses enkripsi
    // AES = advanced enkripsion standart
    let result = crypto.AES.encrypt(plainText, secretKey).toString()
    // return result = mengembalikan bentuk enkripsinya
    return result

}

// membuat fungsi deskripsi
exports.deskripsi = (chiperText) => {
    // define secretkey
    let secretKey = `YTTA`

    // proses deskripsi
    let byte = crypto.AES.decrypt(chiperText,secretKey)
    let result = byte.toString(crypto.enc.Utf8)
    return result 
}