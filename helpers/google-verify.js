//require
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
//end require

//main
async function googleVerify( token = '') {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  //const payload = ticket.getPayload();
  //const userid = payload['sub'];
  // If request specified a G Suite domain:
  // const domain = payload['hd'];

  //desestructuramos la informacion que deseamos en la respuesta de google 
  const {name, picture, email} = ticket.getPayload();
  //retornamos los datos
  return {
    name, 
    img : picture, // puedo renombrar <nombre que asigno> : <parametro a renombrar>
    email
  }

 //console.log(payload);
}

//verify
//googleVerify().catch(console.error);

//exports
module.exports = {
  googleVerify
}