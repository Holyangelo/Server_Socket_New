// requiere la list
require('dotenv').config();
//end require la list

//imports for application
const Server = require('./models/server');
//end import for application

//instanciamos el servidor
const server = new Server();

//llamamos el servidor
server.listen();