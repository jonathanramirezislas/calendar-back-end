
/*
User routes

host + /api/auth
*/

const { Router} = require('express');
const router = Router();

const {createUser, loginUser ,revalidateToken} = require('../controllers/auth')

router.post('/', loginUser );
router.post('/new', createUser );
router.get('/renew', revalidateToken)

    

module.exports = router;