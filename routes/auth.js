
/*
User routes

host + /api/auth
*/

const { Router} = require('express');
const router = Router();
const { check } = require('express-validator');
const { validatefields } = require('../middlewares/fields-validator');


const {createUser, loginUser ,revalidateToken} = require('../controllers/auth')

router.post('/',
    [ // middlewares to check vales from the request
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de contener minimo 6 caracteres').isLength({ min: 6 }),
    validatefields
    ], 
    loginUser );


router.post('/new',
    [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de contener minimo 6 caracteres').isLength({ min: 6 }),
    validatefields
    ], 
    createUser );

        
router.get('/renew', revalidateToken)

    

module.exports = router;