const jwt = require('jsonwebtoken')

const validarJWT = (req,res,next) => {

    const token = req.header('x-token')
    
    if (!token) {
        return res.status(401).json({
            ok:false,
            msg:'no hay token'

        })
    }

    try {
        const {uid} = jwt.verify(token,process.env.JWT_SECRET)

        req.uid = uid;
        console.log(uid)
        next();

        
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:'token incorrecto'
        })
    }

    console.log(token)

}


module.exports = {
    validarJWT
}