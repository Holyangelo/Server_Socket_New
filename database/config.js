//requires
require('colors');
const mongoose = require('mongoose');
//end requires

//imports

//end imports

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log('Online db connection'.yellow);
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
}


//exports
module.exports = {
    dbConnection
}