const path = require('path')
const fs = require('fs')
const  {response} = require('express');
const { v4: uuidv4 } = require('uuid');
const {actualizarImagen} = require('../helpers/actualizar-imagen')

const fileUpload = (req, res = response) => {
    const tipo = req.params.tipo
    const id = req.params.id

    const tiposValidos = ['hospitales', 'medicos' ,'usuarios'];

    if(!tiposValidos.includes(tipo)){
        return res.status(400).json({
            ok:false,
            msg:'No es un medico , usuario u hospital (tipo)'
        })

    }

    //validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:true,
            msg:'No hay ningun archivo.'
        });
      }


      //procesar la imagen

      const file = req.files.imagen;

      const nombreCortado = file.name.split('.');
      const extensionArchivo = nombreCortado[nombreCortado.length -1];

      const extencionesValidas = ['png','jpg','jpeg','gif'];

      if(!extencionesValidas.includes(extensionArchivo)){
        return res.status(400).json({
            ok:false,
            msg:'No es una extencion permitiida'
        })
    }

    
        //generar nombre de la imagen 
        const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;
        //path guardar la imagen
        const path = `./uploads/${tipo}/${nombreArchivo}`

        file.mv(path, (err) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    ok:false,
                    msg:'error al mover la imagen'
                })
            }
            // res.send('file uload')
            res.json({
                ok:true,
                msg:'archivo subido',
                nombreArchivo
            })
        })

    
        //ACTUALIZAD BD

        actualizarImagen(tipo, id, nombreArchivo);





}


const retornaImagen = (req,res = response) => {
    const tipo = req.params.tipo
    const foto = req.params.foto

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`)

    //imagen por defecto
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg)
        
    } else {
        const pathImg = path.join(__dirname, `../uploads/no-img.jpg`)
        res.sendFile(pathImg)

    }
    res.sendFile(pathImg)

}

module.exports = {
    fileUpload,
    retornaImagen
}