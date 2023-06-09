//require
//end require

//main
const socketController = (socket) => { //con this hacemos referencia al objecto del servidor
        // send a message to the client
            //socket.emit("hello from server", 1, "2", { 3: Buffer.from([4]) });
            console.log('Connected: ', socket.id);
            //para desconectar cliente en socket io
            socket.on('disconnect', () => {
                console.log('Disconnected: ', socket.id);
            });

            //siempre dentro de la conexion se crea el listener
            //callback es la referencia al segundo argumento que se le envia, el nombre puede ser cualquiera
            socket.on('send-message', (payload, callback) => { //on significa que esta escuchando a la espera de recibir, payload siempre es el primer argumento de la funcion, es decir, el payload es la informacion que recibimos del front
                //para enviar a un cliente en especifico
                const { id, msg, time } = payload;
                //callback(id);// si solo queremos enviar un parametro
                callback({id, msg, time}); //para enviar un objeto
                //broadcast envia mensaje a todos como difusor
                socket.broadcast.emit('send-message', payload);
                //si yo quiero enviar mensaje a todos los clientes conectados en el momento
                //this.io.emit('send-message', payload);
            });
        };
//exports
module.exports = {
	socketController
}