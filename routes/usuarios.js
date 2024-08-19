/* ruta: /api/usuarios*/

const { Router } = require('express');
const { check } = require('express-validator')

const { validarCampos } = require('../middlewares/validar-campos')
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();



router.get('/',validarJWT, getUsuarios);
router.post('/',
    [
        validarJWT,
        check('nombre', 'nombre obligatorio').not().isEmpty(),
        check('password', 'password obligatorio').not().isEmpty(),
        check('email', 'email obligatorio').isEmail(),
        validarCampos,
    ],
    crearUsuario);

router.put('/:id',
    [
        check('nombre', 'nombre obligatorio').not().isEmpty(),
        check('email', 'email obligatorio').isEmail(),
        check('role', 'role obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarUsuario
);

router.delete('/:id',validarJWT, borrarUsuario);


module.exports = router;