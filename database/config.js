const mongoose = require('mongoose');

const dbConnection = async () => {


    try {
        await mongoose.connect(process.env.DB_CNN, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true
        });
        console.log('BD ONLINE')
    } catch (error){
        console.log(error)
        throw new Error('error a la hora deiniciar la BD')

    }



}

module.exports = {
    dbConnection
}