const express = require('express');
const cors = require('cors');
require('dotenv').config();



const app = express();                              
const port = process.env.PORT || 4005;


app.use(cors());                                   
app.use(express.static(__dirname + '/public'));


app.use(express.urlencoded({ extended: false }))    
app.use(express.json())   


// app.use('/', require('./routers/routerFront'));                     //ruta Front
// app.use('/dashboard-usuario', require('./routers/routerFrontUser')); // ruta usuario películas favoritas
// app.use('/dashboard-admin', require('./routers/routerFrontAdmin'));


//404
app.use((req, res, next) => {

    res.status(404).render('404', {
        error: '404',
        msg: 'Página no encontrada'
    });

});


//Listener
app.listen(port, () => console.log(`Server listening on port ${port}...`))