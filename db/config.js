
const mongoose = require('mongoose');


const dbConnection = async () => {
    try{
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true});

        console.log("base de datos conectada Oline");
    }catch(err){
        console.log(err);
        throw new Error(err);
    }
}

module.exports = {
    dbConnection
}