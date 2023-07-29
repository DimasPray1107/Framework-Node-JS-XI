const express = require(`express`)
const app = express()
const cors = require(`cors`)
app.use(cors())

/** define port for the server */
const PORT = 9000

/** load a all route */
const mejaRoute = require(`./routes/meja.route`)
const menuRoute = require(`./routes/menu.route`)
const userRoute = require(`./routes/user.route`)
const transaksiRoute = require(`./routes/transaksi.route`)
const authRoute = require(`./routes/auth.route`)

/** register all route */
app.use(mejaRoute)
app.use(menuRoute)
app.use(userRoute)
app.use(transaksiRoute)
app.use(authRoute)
app.use(express.static(__dirname))

/** register route of auth */
app.use(authRoute)

/** run the server */
app.listen(PORT, () => {
    console.log(`Server run on PORT ${PORT}`)
})