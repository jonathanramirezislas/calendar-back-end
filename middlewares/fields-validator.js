const { response } = require('express'); //only to have the help of typed 
const { validationResult } = require('express-validator');

const validatefields = (req, res = response, next) => {

    // handle  errors from check routes
    const errors = validationResult( req );
    if ( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }


    next();
}

module.exports = {
    validatefields
}

