const express = require('express');
require('dotenv').config();
const cors = require('cors');

const { dbConnection } = require('./database/config');


//Crete express server
const app = express();


// connection db
dbConnection();


// CORS ..alllow any ip from outside to access our endpoints
//app.use(cors());


// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Directorio publico
app.use(express.static('public'));

// Read and cast json inputs
app.use( express.json() );

// routes
app.use('/api/auth', require('./routes/auth') );
app.use('/api/events', require('./routes/events') );



//Listen to request
app.listen(process.env.PORT, ()=>{
    console.log(`Server running in port ${ process.env.PORT }`)

});
