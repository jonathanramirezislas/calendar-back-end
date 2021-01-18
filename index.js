const express = require('express');
require('dotenv').config();


//Crete express server
const app = express();




//Directorio publico 
app.use(express.static('public'));

// Read and cast json inputs
app.use( express.json() );

// routes
app.use('/api/auth', require('./routes/auth') );


//Listen to request
app.listen(process.env.PORT, ()=>{
    console.log(`Server running in port ${ process.env.PORT }`)

});
