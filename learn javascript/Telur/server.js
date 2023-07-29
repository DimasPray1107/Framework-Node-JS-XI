/** load library express */
const express = require(`express`)

/** instance "app" object */
const app = express()

/** define port for the server */
const PORT = `3000`

/** set view engine to ejs */
app.set(`view engine`, `ejs`)

// load library express-session
const session = require(`express-session`)

// session configuration
app.use(session({
    secret:`session javascript`,
    resave:false,
    saveUninitialized:false
}))

/** load routes */
const telur = require(`./routes/telur.route`)

/** load routes */
const member = require(`./routes/member.route`)

/** load routes */
const admin = require(`./routes/admin.route`)

/** load routes */
const pack = require(`./routes/pack.route`)

/** load routes */
const auth = require(`./routes/auth.route`)

/** load routes */
const transaksi = require(`./routes/transaksi.route`)

/** load routes */
const cart = require(`./routes/cart.route`)


/** define prefix for route obat */
app.use(`/telur`, telur)

/** define prefix for route obat */
app.use(`/member`, member)

/** define prefix for route obat */
app.use(`/admin`, admin)

/** define prefix for route obat */
app.use(`/pack`, pack)

/** define prefix untuk apoteker */
app.use(`/auth`,auth)

/** define prefix untuk apoteker */
app.use(`/transaksi`,transaksi)

/** define prefix untuk apoteker */
app.use(`/cart`,cart)


/** running web server based on defined PORT */
app.listen(PORT, () => {
    console.log(`Server Endeogg is running on port ${PORT}`);
})
