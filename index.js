require('dotenv').config();

const express = require('express');

const cors = require('cors')


const { dbConnection } = require('./database/config')
//crea el servidor express
const app = express();

//CORS
app.use(cors());

//carpeta publica
app.use(express.static('public'));

//lectura y parseo del body
app.use(express.json());
//database
dbConnection();

console.log(process.env)
//Rutas

app.use('/api/usuarios', require('./routes/usuarios'));

app.use('/api/hospitales', require('./routes/hospitales'));

app.use('/api/medicos', require('./routes/medicos'));

app.use('/api/login', require('./routes/auth'));

app.use('/api/todo', require('./routes/busquedas'));

app.use('/api/uploads', require('./routes/uploads'));

// app.get('/' , (req, res) => {
//     res.json({
//         ok:true,
//         msj:'hola mundo'
//     })
// });

// app.get('/api/usuarios' , (req, res) => {
//     res.json({
//         ok:true,
//         usuarios:[{
//             id:123,
//             nombre:'Fernando'
//         }],
//         })
// });

app.listen(process.env.PORT,() => {
    console.log('server corriendo en ' + process.env.PORT)
});
// console.log('HOLAAAAA MUNDOOOOOO')
