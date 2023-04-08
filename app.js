const express = require('express');
const cors = require('cors');
require('dotenv').config();



const app = express();                              
const port = process.env.PORT || 4005;


app.use(cors());                                   
app.use(express.static(__dirname + '/public'));


app.use(express.urlencoded({ extended: false }))    
app.use(express.json())   


//rutas
app.use("/", require("./routers/user"))
app.use("/admin", require("./routers/admin"))

//404
app.use((req, res, next) => {

    res.status(404).render('404', {
        error: '404',
        msg: 'Página no encontrada'
    });

});


//Listener
app.listen(port, () => console.log(`Server listening on port ${port}...`))