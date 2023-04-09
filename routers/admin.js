const express = require("express")
const router = express.Router()

const { upload } = require("../middleware/multer")

const {
    getArticulos,
    getArticulo,
    crearArticulo,
    nuevoArticulo,
    actualizarArticuloform,
    actualizarArticulo,
    eliminarArticulo
} = require("../controllers/admincontrollers")



router.get("/articulos/:email", getArticulos) //Articulosx

router.get("/articulo/:email", getArticulo)  //articulo

router.post("/nuevo/:email", upload, crearArticulo) //nuevoform


router.get("/nuevo/formulario", nuevoArticulo); //nuevo form

router.get("/form/nuevo/:email", actualizarArticuloform);

router.post("/nuevo/:email", upload, actualizarArticulo)



router.get("/eliminar/:email", eliminarArticulo)


module.exports = router