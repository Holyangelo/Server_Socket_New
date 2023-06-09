//ademas del document.getElementById podemos usar el querySelector
const online = document.querySelector('#server-online');
const offline = document.querySelector('#server-offline');
//creamos las variables de respuesta en el front
const msg = document.querySelector('#msg');
const btn = document.querySelector('#btnSend');
const receipt = document.querySelector('#receipt');
const time = document.querySelector('#time');
const id = document.querySelector('#id');
//crearemos el cliente socket8
const socket = io(); // llamamos al io del socket para conectarlo

//variables
// Use of Date.now() method
var date = Date(Date.now());
//Converting the number of a millisecond in the date string
let currentDate = date.toString();
console.log(currentDate);

//para poder escuchar o capturar eventos que esten sucediendo uso
socket.on('connect', () => {
	console.log('connect');
	offline.style.display = 'none';
	online.style.display = '';
});

//para poder escuchar o capturar eventos que esten sucediendo uso
socket.on('disconnect', () => {
	console.log('disconnect');
	online.style.display = 'none';
	offline.style.display = '';
});
//escuchando la respuesta del servidor de send-message para mostrarla en el front
socket.on('send-message', (payload) => {
	receipt.value = payload.msg;
	time.value = payload.time;
	id.value = payload.id;
})

//creamos el event listener del boton para enviar el mensaje
btn.addEventListener('click', () => {
	const msg_listener = msg.value;
	console.log(msg_listener);
	// puedo enviar objetos a mi server, socket.id almacena el id de la sesion en el momento
	const payload = {
		id: socket.id,
		msg : msg_listener,
		time : currentDate
	}
	msg_listener.length < 1 
	? receipt.value = 'no debe estar vacio'
	: socket.emit('send-message', payload, (id) => {
		console.log(id);
	});
});
