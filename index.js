require('dotenv').config();

const express = require('express');

const cors = require('cors')


const { dbConnection } = require('./database/config')
//crea el servidor express
const app = express();

//CORS
app.use(cors())
//database
dbConnection();

console.log(process.env)
//Rutas

app.get('/' , (req, res) => {
    res.json({
        ok:true,
        msj:'hola mundo'
    })
});

app.listen(process.env.PORT,() => {
    console.log('server corriendo en ' + process.env.PORT)
});
// console.log('HOLAAAAA MUNDOOOOOO')
