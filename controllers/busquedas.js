//get todo


const { response, json } = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');
const { generarJWT } = require('../helpers/jwt');


const getTodo = async (req, res = response) => {

    const busqueda = req.params.busqueda
    const regEx = new RegExp(busqueda, 'i');

    const [usuarios,medicos,hospitales] = await Promise.all([
         Usuario.find({nombre: regEx}),
         Hospital.find({nombre: regEx}),
         Medico.find({nombre: regEx})
    ])

    res.json({
        ok: true,
        usuarios,
        hospitales,
        medicos
    })
}
const getDocumentosColeccion = async (req, res = response) => {

    const busqueda = req.params.busqueda
    const tabla = req.params.tabla
    const regEx = new RegExp(busqueda, 'i');

    let data = [];

    switch (tabla) {
        case 'medicos':
            data = await  Medico.find({nombre: regEx})  
                                                .populate('usuario', 'nombre img')
                                                .populate('hospital', 'nombre img')
            break;
        case 'hospitales':
            data = await  Hospital.find({nombre: regEx})  
                                                    .populate('usuario','nombre img')
            break;
        case 'usuarios':
           data = await  Usuario.find({nombre: regEx})        
            break;
    
        default:
            res.status(400).json({
                ok:false,
                msg:'la tabla tieneque ser usuarios/medicos/hospitales'
            })

    }

    res.json({
        ok:true,
        resultados:data
    })
}

module.exports = {
    getTodo,
    getDocumentosColeccion
}