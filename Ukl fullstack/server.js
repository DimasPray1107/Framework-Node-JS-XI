/** load library express */
const express = require(`express`)

/** instance "app" object */
const app = express()

/** define port for the server */
const PORT = `9000`

 
app.set(`view engine`,`ejs`)

// load library express-session
const session = require(`express-session`)

// session configuration
app.use(session({
    secret: `i love javascript`,    
    resave: false,
    saveUninitialized: false
}))


/** load routes */
const telur = require(`./routes/telur.route`)
const admin = require(`./routes/admin.route`)
const member = require(`./routes/member.route`)
const pack = require(`./routes/pack.route`)
const auth = require(`./routes/auth.route`)
const transaksi = require(`./routes/transaksi.route`)
const cart = require(`./routes/cart.route`)

/** define prefix for route obat */
app.use(`/telur`,telur)
app.use(`/admin`,admin)
app.use(`/member`,member)
app.use(`/pack`,pack)
app.use(`/auth`,auth)
app.use(`/transaksi`,transaksi)
app.use(`/cart`,cart)


/** running web server based on defined PORT */
app.listen(PORT, () => {
    console.log(`Server telur is running on port ${PORT}`);
})     

