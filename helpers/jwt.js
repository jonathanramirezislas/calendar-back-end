const jwt = require('jsonwebtoken');

const generarJWT = ( uid, name ) => {

    return new Promise( (resolve, reject) => { //creat and return a promise

        const payload = { uid, name }; //data from users

        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (err, token ) => {

            if ( err ){
                console.log(err);
                reject('Token could not be generated');
            }

            resolve( token ); //return token 
        })


    })
}

module.exports = {
    generarJWT
}


