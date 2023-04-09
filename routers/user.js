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
 


    router.get("/articulos", getAllArticulos) //esta


    router.get("/articulo/:email", getArticulo) //esta

    router.get("/form/buscar", searchArticulosForm) //esta

    router.post("/buscar/:search", searchArticulo) //esta

    router.get("/login", LoginPage) //esta 

    router.post("/form/registrarse", loginUser)//esta


    router.get("/", LogIn) //esta

    router.get("/logout", logout) //esta


module.exports = router
