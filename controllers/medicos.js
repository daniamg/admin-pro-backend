const {response} = require('express')
const Medico = require('../models/medico')
const hospital = require('../models/hospital')

const getMedicos = async (req, res = response) => {
    const medicos = await  Medico.find()
    .populate('usuario','nombre')
    .populate('hospital', 'nombre')
            res.json({
            ok:true,
            medicos
            })

}

const crearMedico = async(req, res = response) => {
    const uid = req.uid
    const medico = new Medico({
        usuario:uid,
        ...req.body
    })

    try {

        const medicoDB = await medico.save();
        res.json({
            ok:true,
            medico: medicoDB
        })
        
    } catch (error) {
        console.log(error)

        res.status(500).json({
            ok:false,
            msg:'hable con el admin'
        })         
        
    }
    res.json({
        ok:true,
        msg:'crearMedico'
    })
}

const actualizarMedico = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid
    try{
        const medico = await Medico.findById(id);

        if(!medico){
            return res.status(404).json({
                ok:true,
                msg:'medico no encontrado'
            })
        }

        const cambiosMedico = {
            ...req.body,
            usuario:uid

        }
        const medicoActualizado =  await Medico.findByIdAndUpdate(id, cambiosMedico, {new:true})
        res.json({
            ok:true,
            msg:'actualizarMedico',
            medico: medicoActualizado
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error insesperado'
        })

    }

    // res.json({
    //     ok:true,
    //     msg:'actualizarMedico'
    // })
}

const borrarMedico = async(req, res = response) => {
    const id = req.params.id;
   
    try{
        const medico = await Medico.findById(id);

        if(!medico){
            return res.status(404).json({
                ok:true,
                msg:'Medico no encontrado'
            })
        }

        await Medico.findByIdAndDelete(id)

        res.json({
            ok:true,
            msg:'medico eliminado'
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error insesperado'
        })

    }
    // res.json({
    //     ok:true,
    //     msg:'borrarMedico'
    // })
}


module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}