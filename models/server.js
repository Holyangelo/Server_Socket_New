//require
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
//end require

class Server { //class server name

    //constructor for the server
    constructor() {
        //create a new instance FOR EXPRESS
        this.app = express();

        //lo manejare como una propiedad de mi clase usando this. / esto se usa para poder manejar sockets y debe hacerse desde el server
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        //anexamos el puerto
        this.port = process.env.PORT;

        //Paths Object

        this.paths = {
            authPath : '/auth'
        }
        
        //connect to the database
        this.connectDB();


        //middleware
        this.middleware();

        //agregamos las rutas
        this.routes();

    }

    async connectDB() {
        //create a new connection to the database
        await dbConnection();
    }

    middleware() { //vamos a crear una funcion para los middlewares
        //CORS - Siempr es importante colocarlo para que podamos saltarnos ciertas funciones de algunos navegadores
        this.app.use(cors());
        //POST - parse (lectura con parseo del body)
        this.app.use(express.json());
        //middleware para public
        this.app.use(express.static('public')); //el "use" es el elemento clave para la creacion de los middlewares
        // Note that this option available for versions 1.0.0 and newer. 
    }

    routes() { // creamos esta funcion llamada rutas, aqui vamos a crear todas las rutas de nuetra app
        //auth path
        this.app.use(this.paths.authPath, require('../routes/auth'));
    }

    listen() { // creamos la funcion de escuchar, aqui vamos a tener los puertos a escuchar de nuestro servidor
        //listen on port
        this.server.listen(this.port, () => { //aqui no tengo el port, sino que debo llamarlo desde el constructor como this.port
            console.log(`this server is listening on ${this.port}`);
        });
    }
}

module.exports = Server;