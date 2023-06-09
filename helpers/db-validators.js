//require
const Role = require('../models/roles');
const User = require('../models/users'); // es un estandar que se importe con la primera letra en mayus
const Product = require('../models/product'); // es un estandar que se importe con la primera letra en mayus
const Category = require('../models/category');
//end require

//funcion para validar rol
const roleIsValid = async(role = '') => {
const existRole = await Role.findOne({ role });// findOne me sirve para buscar un objeto dentro de una clase o para buscar dentro de un elemento otro elemento.
        if( !existRole ){
            throw new Error(`El rol ${role} ingresado no es valido`);
        }
    };

const emailIsValid = async(email = '') => {
    const emailExist = await User.findOne({ email });
    if(emailExist){
        /*return res.status(400).json({
            msg:'Correo ya existe'
        })*/
        throw new Error(`El correo ${email} ingresado ya existe`);
    }
}

const idFind = async(id = '') => {
    const userExist = await User.findById( id );
    if( !userExist ){
        throw new Error(`El ID ${ id } ingresado no existe`);
    }
}

const validateCategory = async(id = '') =>{
    const categoryExist = await Category.findById( id );
    if( !categoryExist ){
        throw new Error(`El ID ${ id } ingresado no existe`);
    }
}

const validateProduct = async(id = '') =>{
    const productExist = await Product.findById( id );
    if( !productExist ){
        throw new Error(`El ID ${ id } ingresado no existe`);
    }
}

//funcion para validar rol
const validateProductExist = async(name = '') => {
    const productExist = await Product.findOne({ name });
    if(productExist){
        /*return res.status(400).json({
            msg:'Correo ya existe'
        })*/
        throw new Error(`El Product ${name} ingresado ya existe`);
    }
}

//collections validate 
const allowedCollections = (collection = '', collections = []) =>{
    const include = collections.includes(collection);
    if (!include) {
        // statement
        throw new Error(`the collection ${collection} is not allowed`);
    }
    return true;
}


module.exports = {
    roleIsValid,
    emailIsValid,
    idFind,
    validateCategory,
    validateProduct,
    validateProductExist,
    allowedCollections
}