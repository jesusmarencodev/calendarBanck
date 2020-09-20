const express = require( 'express' );
const cors = require('cors');
require( 'dotenv' ).config();
const { dbConnection } = require('./db/config');





//Crear el servidor de express
const app = express();

// CORS
app.use(cors());

//Conectarme a la DB
dbConnection();

//Directorio publico
app.use( express.static('public') );

//Lectura y parseo del body este seria el body-parser pero directamente con express
app.use( express.json() );


//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));


//Escuchar peticion
app.listen( process.env.PORT, () =>{
	console.log(`Servidor corriendo en el puerto ${ process.env.PORT }`)
});