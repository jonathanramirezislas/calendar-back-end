

const {response} = require('express')

const createUser= (req , res = response ) => {

    const { name, email, password } = req.body; 
 
    res.json({
        ok:true,
        msg:'get',

    })
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