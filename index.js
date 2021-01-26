const express = require('express');
require('dotenv').config();
const cors = require('cors');
const corsOptions = {
    origin: 'https://calendar-jonas.herokuapp.com',
    optionsSuccessStatus: 200 
  }
const { dbConnection } = require('./database/config');


//Crete express server
const app = express();


// connection db
dbConnection();


// CORS ..alllow any ip from outside to access our endpoints
app.use(cors(corsOptions))

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
