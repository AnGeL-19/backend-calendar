const {Router} = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, renovarToken } = require('../controllers/authController');
const {validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/new', [
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').not().isEmpty(),
    check('email','Debe de ser un email').isEmail(),
    check('password','El password debe ser mayor a 6 caracteres').isLength({min:6}),
    validarCampos
] ,crearUsuario);

router.post('/', [
    check('email','El email es obligatorio').not().isEmpty(),
    check('email','Debe de ser un email').isEmail(),
    check('password','El password debe ser mayor a 6 caracteres').isLength({min:6}),
    validarCampos
] ,loginUsuario);

router.get('/renew', [
    validarJWT
] ,renovarToken);

module.exports = router;