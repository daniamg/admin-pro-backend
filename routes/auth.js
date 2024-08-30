const { Router } = require('express');

const { login,googleSignIn,rewnewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

/** /api/login */


router.post('/',[
        check('email',' email obigatorio').isEmail(),
        check('password', 'password obligatorio').not().isEmpty(),
        validarCampos
    ],
    login
)

router.post('/google',[
    check('token','El token de google es obligatorio').not().isEmpty(),
    validarCampos
],
googleSignIn
)


router.get('/renew',
    validarJWT,
    rewnewToken
)




module.exports = router;