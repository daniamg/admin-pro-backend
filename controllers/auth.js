const { response } = require("express");
const bcrypt = require('bcryptjs')
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");

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


const googleSignIn = async (req, res = response) => {

    try {
    const {email,name,picture} = await googleVerify(req.body.token);
    const usuarioDB = await Usuario.findOne({email});
    let usuario
    
    if(!usuarioDB){
        usuario = new Usuario({
            nombre:name,
            email,
            password:'@@@',
            img:picture,
            google:true,

        })
    }else{
        usuario = usuarioDB;
        usuario.google = true;
    }

    await usuario.save();


    //generar token

    const token = await  generarJWT(usuario.id)



    res.json({
        ok:true,
        email, name, picture, token
    })
        
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:'token de google no es correctoaafaaf'
        })
    }


}

const rewnewToken = async(req, res = response) =>{

    const uid = req.uid

    const token = await generarJWT(uid)


    res.json({
        ok:true,
        token
    })
}
module.exports = {
    login,
    googleSignIn,
    rewnewToken
}