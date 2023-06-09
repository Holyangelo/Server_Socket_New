//require
const jwt = require('jsonwebtoken');
//end require

//main 

const generateJWT = (uid = '') => {

	//jwt exige que se trabaje en base a promesas
	return new Promise((resolve, reject) => {
		// puedo grabar cualquier datos que yo quiera de lo que me envie el usuario, const payload = {email, password, id, etc}
		const payload = { uid };
		//creamos la firma del jwt jwt.sign(lo que deseamos grabar, el secret key que generamos, opciones adicionales)
		jwt.sign(payload, process.env.SECRET_KEY_JWT, {
			expiresIn:'4h'
		}, //resolvemos el callback
		(err, token) =>{
			if (err) {
				console.log(err);
				// statement
				reject('cant generate jwt');
			}else{
				resolve(token);
			}
		});
	});
}


//exports
module.exports = {
	generateJWT
};