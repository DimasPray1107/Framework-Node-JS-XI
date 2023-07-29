const express = require("express") // memanggil library express js
const bodyParser = require("body-parser") // memanggil library body-parser
const cors = require("cors") // memanggil library cors
const app = express()

// penggunaan body-parser untuk ekstrak data request berformat JSON
app.use(bodyParser.json())

// penggunaan body-parser untuk ekstrak data request dari body
app.use(bodyParser.urlencoded({ extended: true }))

// penggunaan cors agar end point dapat diakses oleh cross platform
app.use(cors())

// endpoint "/test" dengan method GET
app.get("/test", (req, res) => {
    // req merupakan variabel yang berisi data request
    // res merupakan variabel yang berisi data response dari end-point

    // membuat objek yang berisi data yang akan dijadikan response
    let response = {
        message: "Ini end-point pertama ku",
        method: req.method,
        code: res.statusCode
    }

    // memberikan response dengan format JSON yang berisi objek di atas
    res.json(response)
})
// menjalankan server pada port 8000
app.listen(8000, () => {
    console.log("Server run on port 8000");
})

// endpoint "/profil/nama/umur" dengan method GET
app.get("/profil/:name/:age", (req, res) => {
    // :name dan :age 🡪 diberikan titik dua didepan menunjukkan "name" dan "age" 
    // bersifat dinamis yang dapat diganti nilai nya saat melakukan request

    // menampung data yang dikirimkan
    let name = req.params.name // mengambil nilai pada parameter name
    let age = req.params.age // mengambil nilai pada parameter age

    // membuat objek yang berisi data yang akan dijadikan response
    // response berisi data nama dan umur sesuai dengan nilai parameter
    let response = {
        nama: name,
        umur: age
    }

    // memberikan response dengan format JSON yang berisi objek di atas
    res.json(response)

})

// end-point "/bujur_sangkar" dengan method POST
app.post("/bujur_sangkar", (req, res) => {
    // menampung data yang dikirimkan dan mengkonversi menjadi tipe numerik
    let panjang = Number(req.body.panjang) // mengambil nilai panjang dari body
    let lebar = Number(req.body.lebar) // mengamil nilai lebar dari body

    let luas = panjang * lebar
    let keliling = 2 * (panjang + lebar)

    // membuat objek yang berisi data yang akan dijadikan response
    let response = {
        panjang: panjang,
        lebar: lebar,
        luas: luas,
        keliling: keliling
    }

    // memberikan response dengan format JSON yang berisi objek di atas
    res.json(response)
})







// endpoint celcius
// end-point "/celcius" dengan method POST
app.post("/celcius", (req, res) => {
    // menampung data yang dikirimkan dan mengkonversi menjadi tipe numerik
    let celcius = Number(req.body.celcius) // mengambil nilai celcius dari body

    let fahrenheit = (9 / 5 * celcius) + 32
    let kelvin = celcius + 237
    let reamur = 4 / 5 * celcius

    let response = {
        celcius: celcius,
        fahrenheit: fahrenheit,
        kelvin: kelvin,
        reamur: reamur

    }
    res.json(response)


})



// endpoint farenheit
// end-point "/fahrenheit" dengan method POST
app.post("/fahrenheit", (req, res) => {
    // menampung data yang dikirimkan dan mengkonversi menjadi tipe numerik
    let fahrenheit = Number(req.body.fahrenheit) // mengambil nilai celcius dari body

    let celcius = 5 / 9(fahrenheit - 32)
    let kelvin = 5 / 9 + 273 * fahrenheit - 32
    let reamur = 4 / 9 * fahrenheit - 32

    let response = {
        fahrenheit: fahrenheit,
        celcius: celcius,
        kelvin: kelvin,
        reamur: reamur

    }
    res.json(response)


})





// endpoint celcius
// end-point "/celcius" dengan method POST
app.post("/reamur", (req, res) => {
    // menampung data yang dikirimkan dan mengkonversi menjadi tipe numerik
    let reamur = Number(req.body.reamur) // mengambil nilai celcius dari body

    let celcius = 5 / 4 * reamur
    let fahrenheit = 9 / 4 + (32 * reamur)
    let kelvin = (5 / 4 * reamur) + 273


    let response = {
        reamur: reamur,
        fahrenheit: fahrenheit,
        celcius: celcius,
        kelvin: kelvin


    }
    res.json(response)
})


// endpoint celcius
// end-point "/celcius" dengan method POST
app.post("/kelvin", (req, res) => {
    // menampung data yang dikirimkan dan mengkonversi menjadi tipe numerik
    let kelvin = Number(req.body.kelvin) // mengambil nilai celcius dari body

    let celcius = 5 / 4 * kelvin
    let fahrenheit = 9 / 4 + (32 * kelvin)
    let reamur = (5 / 4 * kelvin) + 273


    let response = {
        kelvin: kelvin,
        fahrenheit: fahrenheit,
        celcius: celcius,
        reamur: reamur


    }
    res.json(response)
})











app.post("/bmi", (req, res) => {
    // menampung data yang dikirimkan dan mengkonversi menjadi tipe numerik


    let beratBadan = Number(req.body.beratBadan)

    let tinggiBadan = Number(req.body.tinggiBadan)

    let bmi = beratBadan / (tinggiBadan * tinggiBadan)

    let status
    if (bmi < 18.5) {
        status = `kurang gizi`
    } else if (bmi > 18.5 && bmi < 24.9) {
        status = `Normal(ideal)`
    } else if (bmi > 25.0 && bmi < 29.9) {
        status = `Gemuk`
    } else if (bmi > 30) {
        status = `Obesitas`
    }


    let response = {
        beratBadan: beratBadan,
        tinggiBadan: tinggiBadan,
        bmi: bmi,
        status:status

    }
    // memberikan response dengan format json yang berisi objek di atas
    res.json(response)
})