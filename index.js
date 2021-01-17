const express = require('express');

//Crete express server
const app = express();

// routes

app.get('/', (req, res) => {

    console.log('hola');
    res.json({
        ok:true
    })
})

//Listen to request
app.listen(4000, ()=>{
    console.log(`Server running in port ${ 4000 }`)

})
