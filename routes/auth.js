const { Router } = require('express');

const { login } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

/** /api/login */


router.post('/',[
        check('email',' email obigatorio').isEmail(),
        check('password', 'password obligatorio').not().isEmpty(),
        validarCampos
    ],
    login
)





module.exports = router;