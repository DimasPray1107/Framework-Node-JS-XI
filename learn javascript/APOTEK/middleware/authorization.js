// fungsi authorization
exports.cekUser = (request, response, next) => {
    // fungsi ini digunakan untuk mengecek data user yg tersimpan di session
    // jika datanya tersipan di session maka boleh untuk mengakses fitur yang diinginkan
    // jika datanya tidak tersimpan di session maka akan dikembalikan ke halaman login
    if (request.session.dataUser === undefined) {
        return response.redirect(`/auth`)
    } else {
        // lanjut ke fitur yang diinginkan
        next()
    }
}