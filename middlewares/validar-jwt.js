const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = ( req, res = response, next ) => {

    // x-token  from headers (key)
    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({ //401 is the error is not authenticated user
            ok: false,
            msg: 'There is no token in the request'
        });
    }


    try {
        //verify the token
        const { uid, name } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );
        //we modify the request and add new fields to the request that will pass to next
        req.uid = uid; 
        req.name = name;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token is not valid'
        });
    }

    next(); //next is the controller
}


module.exports = {
    validarJWT
}
