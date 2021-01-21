

const {response} = require('express')
const bcrypt = require('bcryptjs');

const User = require('../models/User');


const createUser= async (req , res = response ) => {

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if ( User ) {
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

        //save user 
        await user.save();
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error from server'
        });
    }
}


const loginUser= (req , res = response ) => {
    res.json({
        ok:true,
        msg:'get'
    })
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