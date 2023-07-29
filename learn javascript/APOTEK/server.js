/** load library express */
const express = require(`express`)

/** instance "app" object */
const app = express()

/** define port for the server */
const PORT = `8000`

 
app.set(`view engine`, `ejs`)

// load library express-session
const session = require(`express-session`)

// session configuration
app.use(session({
    secret: `i love javascript`,
    resave: false,
    saveUninitialized: false
}))

/** load routes */
const obat = require(`./routes/obat.route`)
const customer = require(`./routes/customer.route`)
const apoteker = require (`./routes/apoteker.route`)
const auth = require (`./routes/auth.route`)
const transaksi = require(`./routes/transaksi.route`)


/** define prefix for route obat */
app.use(`/obat`,obat)

app.use(`/pelanggan`,customer)

app.use(`/apoteker`,apoteker)

app.use(`/auth`,auth)

app.use(`/transaksi`,transaksi)

/** running web server based on defined PORT */
app.listen(PORT, () => {
    console.log(`Server Apotek is running on port ${PORT}`);
})     

