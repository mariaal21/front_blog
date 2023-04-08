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



router.get("/entries/:email/:page", getArticulos)

router.get("/entry/:title/:email", getArticulo)

router.post("/create/:email", upload, crearArticulo)
// router.post("/create/:email", crearArticulo)

router.get("/form/new/:email", nuevoArticulo);

router.get("/form/update/:title/:email", actualizarArticuloform);

router.post("/update/:title/:email", upload, actualizarArticulo)
// router.post("/update/:title/:email", actualizarArticulo)


router.get("/delete/:title/:email", eliminarArticulo)


module.exports = router