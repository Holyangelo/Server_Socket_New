//require
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const { socketController } = require('../sockets/controller');
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

        // eventos de sockets
        this.sockets();

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

    //creamos el nuevo metodo que manejara los eventos de sockets en el servidor
    sockets(){
        this.io.on("connection", socketController /*(socket) => { //con this hacemos referencia al objecto del servidor
        // send a message to the client
            //socket.emit("hello from server", 1, "2", { 3: Buffer.from([4]) });
            console.log('Welcome to server socket', socket.id);
            //para desconectar cliente en socket io
            socket.on('disconnect', () => {
                console.log('Disconnect from server', socket.id);
            });

            //siempre dentro de la conexion se crea el listener
            //callback es la referencia al segundo argumento que se le envia, el nombre puede ser cualquiera
            socket.on('send-message', (payload, callback) => { //on significa que esta escuchando a la espera de recibir, payload siempre es el primer argumento de la funcion, es decir, el payload es la informacion que recibimos del front
                //para enviar a un cliente en especifico
                const { id, time, msg } = payload;
                //callback(id);// si solo queremos enviar un parametro
                callback({id, msg, time}); //para enviar un objeto
                //si yo quiero enviar mensaje a todos los clientes conectados en el momento
                //this.io.emit('send-message', payload);
            });
        }*/);
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