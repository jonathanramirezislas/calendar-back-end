

const {response} = require('express')
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const { generarJWT } = require('../helpers/jwt');


const createUser = async (req , res = response ) => {

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        console.log(user)
        if ( user ) {
            return res.status(400).json({
                ok: false,
                msg: 'User is already registered'
            });
        }
        //
        user = new User( req.body );
    
        // encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        // Generate JWT
        const token = await generarJWT( user.id, user.name );

        //save user 
        await user.save();
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })

         
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error from server',
            
        });
    }
}


const loginUser = async(req, res = response ) => {

    const { email, password } = req.body;

    try {
        
        const user = await User.findOne({ email });

        //check if there is a user with that email
        if ( !user ) {
            return res.status(400).json({
                ok: false,
                msg: 'Check (email) or password'
            });
        }

        // check if there if matches de password input and database
        const validPassword = bcrypt.compareSync( password, user.password ); //compare passwords
        if ( !validPassword ) { 
            return res.status(400).json({
                ok: false,
                msg: 'Check email or (password)' 
            });
        }

         // Generate JWT
         const token = await generarJWT( user.id, user.name );

         //success response
        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error from server'
        });
    }
}


const revalidateToken= (req , res = response ) => {
    res.json({
        ok:true,
        msg:'get'
    })
}

module.exports = {
    createUser,
    loginUser,
    revalidateToken

}