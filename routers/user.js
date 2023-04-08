const express = require("express")
const router = express.Router()
// const { validateReader } = require("../middleware/validateUserReader")
const {  getAllArticulos,
    getArticulo,
    searchArticulosForm,
    searchArticulo,
    LoginPage,
    loginUser,
    LogIn,
    logout } = require("../controllers/usercontroller")


    router.get("/articulos/:page", getAllArticulos)

    router.get("/entry/:title/:email", getArticulo)

    router.get("/form/search", searchArticulosForm)

    router.post("/search/:page", searchArticulo)

    router.get("/login", LoginPage)

    router.post("/reader/verification", loginUser)
    //proteger url middleware
    // router.use(validateReader)


    router.get("/", LogIn)

    router.get("/logout", logout)


module.exports = router