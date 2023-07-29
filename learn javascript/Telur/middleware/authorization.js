// function authorization
exports.cekUser = (request, response, next) => {
    // fungsi ini untk mengecek data user yg tersimpan di session jika datanya tersimpan di session maka boleh mengakses fitur yang di inginkan dan jika datanya tidak tersimpan di session maka akan dikembalikan ke login
    
    if(request.session.dataUser === undefined) {
        return response.redirect (`/auth`)
    }else{
        // lanjut ke fitur yang diinginkan
        next()
    }
    }