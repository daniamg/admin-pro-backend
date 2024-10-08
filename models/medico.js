const { Schema, model } = require('mongoose')

const MedicoSchema = Schema({
  nombre: {
    type: String,
    required:true,
  },
  img: {
    type: String,    
  },
  usuario:{
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required:true,
  },
  hospital:{
    type: Schema.Types.ObjectId,
    ref: 'Hospital',
    required:true
  }
}, { collection:'medicos' });

MedicoSchema.method('toJSON', function(){
    const {__v, ...object} = this.toObject();
    // object.uid = _id;
    return object;
})

//usuario del token
//usuari id del mongo en hospitales
module.exports = model('Medico',MedicoSchema);