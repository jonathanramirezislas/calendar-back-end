/*
    Event Routes
    /api/events
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validatefields } = require('../middlewares/fields-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');

const router = Router();

// each route has to pass JWT other way to do this is router.post('/route',validarJWT, controller) 
//NOTE if you dont want to use some routes with JWT put above  ↑ of route.use 

router.use( validarJWT );

// Get events
router.get('/', getEventos );

// Create a new  event
router.post(
    '/',
    [
        check('title','Title is required').not().isEmpty(),
        check('start', 'Start date is required').custom( isDate ),
        check('end', 'End date is required').custom( isDate ),
        validatefields
    ],
    crearEvento 
);

// Update a event
router.put(
    '/:id', 
    [
        check('title','Title is required').not().isEmpty(),
        check('start', 'Start date is required').custom( isDate ),
        //field, msg ,custom(function)
        check('end', 'End date is required').custom( isDate ),
        validatefields
    ],
    actualizarEvento 
);

// Delete a event
router.delete('/:id', eliminarEvento );

module.exports = router;
