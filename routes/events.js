/*
	Rutas de Usuario / Events
	host + /api/events
*/

const { Router } = require('express');
const { check  } = require('express-validator');
const router = Router();
const { 
	getEventos,
	crearEvento,
	actualizarEvento,
	eliminarEvento } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


//Todas las peticiones tienen que pasar por el middleware de JWT
router.use(validarJWT)



router.get('/', getEventos );
	
router.post(
	'/',
	[
		check('title', 'El titulo es obligatorio').not().isEmpty(),
		check('start', 'Fecha de inicio es obligatoria').custom(isDate),
		check('end', 'Fecha fin es obligatoria').custom(isDate),
		validarCampos
	],
	crearEvento 
);

router.put(
	'/:id',
	[
		check('title', 'El titulo es obligatorio').not().isEmpty(),
		check('start', 'Fecha de inicio es obligatoria').custom(isDate),
		check('end', 'Fecha fin es obligatoria').custom(isDate),
		validarCampos
	],
	actualizarEvento );

router.delete('/:id', eliminarEvento );


module.exports = router;