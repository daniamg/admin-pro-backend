const { response } = require("express");
const bcrypt = require('bcryptjs')
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        //verificar email
        const usuarioDB = await Usuario.findOne({ email })

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'email  no valido'
            })
        }

        //verificar contraseña
        const vaidPassword = bcrypt.compareSync(password, usuarioDB.password);
        // console.log(vaidPassword,usuarioDB,password,'holaaa')

        if (!vaidPassword) {
            return  res.status(400).json({
                ok: false,
                msg: 'contraseña no valida'
            })
        }

        //general el token

        const token = await generarJWT(usuarioDB.id);


        res.status(200).json({
            ok: true,
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


module.exports = {
    login
}