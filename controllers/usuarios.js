const { response, json } = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');


const getUsuarios = async (req, res) => {
    const usuarios = await Usuario.find({}, 'nombre email role google');
    res.json({
        ok: true,
        usuarios,
    })
}

const crearUsuario = async (req, res = response) => {
    const { email, password, nombre } = req.body;
    try {

        const existeEmail = await Usuario.findOne({ email })

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'el correo existe'
            })
        }
        const usuario = new Usuario(req.body);
        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);


        //guardar usuario
        await usuario.save();
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
            token
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error insesperado'
        })
    }

}


const actualizarUsuario = async (req, res = response) => {
        //TODO: VALIDAR TOKEN
    const uid = req.params.id
    
    try {     
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'no existe un usuario por ese id'
            })
        }
        // const campos = req.body;

        const {passwor, google, email, ...campos} = req.body;

        if(usuarioDB.email != email){
            // delete campos.email;
            const existeEmail = await Usuario.findOne({email})

            if(existeEmail){
                return res.status(400).json({
                    ok:false,
                    msg: 'Ya existe un usuario con ese email'
                })
            }
        }

        campos.email = email;
        //ACTUALIZAR
        // delete campos.password;
        // delete campos.google;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos,{new:true});
    
        res.json({
            ok: true,
            usuario: usuarioActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'update error insesperado'
        })
    }
}

const borrarUsuario = async (req, res = response) => {
     
    const uid = req.params.id
    
    try {                   
        
        
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'no existe un usuario por ese id'
            })
        }

        await Usuario.findByIdAndDelete(uid)
        res.status(200).json({
            ok: true,
            uid
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'delete error insesperado'
        })
    }
    
}


module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}