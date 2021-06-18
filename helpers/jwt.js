const jwt = require('jsonwebtoken');

const generarJWT = (uid, name) => {
    return new Promise( (resolve, reject) => {
        payload = {uid, name};

        jwt.sign(payload, process.env.SECRET_PRIVATE_KEY, {
            expiresIn: '2h'
        }, (err, token) => {
            if(err){
                console.log(err);
                reject('No se pudo generar el token');
            }

            resolve(token);
        })
    }) 
    

}

module.exports = {
    generarJWT
};