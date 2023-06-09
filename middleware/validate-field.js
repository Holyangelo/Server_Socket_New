//require
const { validationResult } = require('express-validator');
//end require

const validateFields = async(req, res, next) =>{
    const errors = await validationResult(req); // validationResult es una funcion del express validator que almacena los errores y los agrupa para mostrarlos
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }
    next(); // si no hay ningun error en este middleware, next permite que la ejecucion continue al siguiente
}

module.exports = {
    validateFields
}