//import petition
const { consulta } = require("../helpers/fetch");
// const cookieParser = require('cookie-parser');

const validate = async (req, res, next) => {

    const method = "POST"
    const email = req.cookies.email
    body = { email }
    const urlEnd = "/verify"
    const data = await consulta(process.env.URLBASEUSERS + urlEnd, method, body);
    if (!data.ok) {
        return res.redirect("/")
    }
    next()
}


module.exports = { validate }