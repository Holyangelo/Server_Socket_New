//require
const bcryptjs = require('bcryptjs')
const { response, request } = require('express');
//const User = require('../models/users');
const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');
//end require

//creamos el controlador para Auth
const login = async(req, res = response) => {
	//desestructuramos los campos que vamos a requerir
	const { email, password } = req.body;

	//creamos un try catch

	try {
		// statements

		//verificar si el email existe
		const user = await User.findOne({email});
		if (!user) {
			// statement
			return res.status(400).json({
				msg:'user or password are incorrect'
			});
		}
		//verificar si el usuario esta activo
		if (!user.status) {
			// statement
			return res.status(400).json({
				msg:'user isnt active' 
			});
		}
		//verificar la contrasena
		const validPassword = bcryptjs.compareSync(password, user.password); //compareSync del paquete bcryptjs nos ayuda a comparar el argumento que le enviamos contra el que existe en la db
		//compareSync(password de la db, password ingresado) asi se envia los password
		if (!validPassword) {
			// statement
			return res.status(400).json({
				msg:'user or password are incorrect' 
			});
		}

		//Generar JWT
		const token = await generateJWT( user.id );
        //recibo el usuario y le envio el token
		res.json({
		user,
		token
	});
	} catch(error) {
		return res.status(500).json({
			msg:'Algo ha salido mal',
			error
		})
	}
	/*
	res.json({
		msg:'Login status 200 OK'
	})*/
}

const googleSignIn = async(req = request, res = response) =>{
	//desestructuramos el id token que viene en el cuerpo del body
	const { id_token } = req.body;

	if(!id_token){
		return res.status(401).json({
			msg:' no se ha encontrado el token de google'
		});
	}

	try {
		// statements
		//creamos la verificacion de google y el usuario con el id_token que recibimos de google
		const { name, img, email } = await googleVerify( id_token );
		//verificamos si el usuario existe en nuestra db
		let user = await User.findOne({ email });
		if(!user){ // si el usuario no existe
			//debo crearlo
			const data = {
				name,
				email,
				password : '=)',
				img,
				google:true
			};
			//creamos el usuario con los datos 
			user = new User(data);
			await user.save();// lo guardamos en db
		}

		//verificamos el estado del usuario 
		if (!user.status) {
			// statement
			return res.status(401).json({
				msg:'user blocked, contact administrator'
			});
		}

		//Generar JWT
		const token = await generateJWT( user.id );
		//response
		/*res.status(200).json({
		msg:'iniciando con google',
		id_token
	})*/
		res.status(200).json({
			user,
			token
		});
	} catch(e) {
		// statements
		res.status(400).json({
			ok: false, 
			msg:'Token not verified'
		});
	}
}

module.exports = {
	login,
	googleSignIn
}