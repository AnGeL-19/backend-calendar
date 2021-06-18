const {Router} = require('express');
const { check } = require('express-validator');

const { getEventos, 
        crearEvento, 
        actualizarEvento, 
        eliminarEvento } = require('../controllers/eventsController');
const { isDate } = require('../helpers/isDate');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// trambien se puede poner asi, esto valida todo lo que esta debajo
//router.use(validarJWT);

// obtener ecentos
router.get('/', validarJWT ,getEventos );

// crear evento 
router.post('/', [
        check('title', 'Es necesario un titulo').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatorio').custom(isDate),
        check('end', 'Fecha de finalizacion es obligatorio').custom(isDate),
        validarCampos
] , validarJWT ,crearEvento );

// actualizar evento
router.put('/:id', validarJWT ,actualizarEvento );

// borrar evento
router.delete('/:id', validarJWT ,eliminarEvento );

module.exports = router;