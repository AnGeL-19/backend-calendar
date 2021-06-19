const {response, request} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');


const crearUsuario = async (req = request, res = response) => {

    const {email, password} = req.body;

    try{
      

        let usuario =  await Usuario.findOne({email});

        if(usuario){
            return res.status(400).json({
                ok:false,
                msg: 'Un usuario existe con ese correo'
            });
        }

        usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();

        // Generar JWT
        const token = await generarJWT(usuario.id,usuario.name);
        
        
        res.status(201).json({
            ok: true,
            msg: 'registrado',
            uid: usuario.id,
            name:usuario.name,
            token
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el bueno osea el jefe'
        })
    }
    

}


const loginUsuario = async (req = request, res = response) => {

    const {email, password} = req.body;

    try{

        let usuario = await Usuario.findOne({email});

        if(!usuario){
            return res.status(400).json({
                ok:false,
                msg: 'El email o contraseña no son correctos'
            });
        }

        // confirmar las contraseñas
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'El email o contraseña no son correctos'
            })
        }

        // Generar nuestro JWT
        const token = await generarJWT(usuario.id,usuario.name);

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    }catch(err){
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el bueno osea el jefe'
        });
    }



}


const renovarToken = async (req = request, res = response) => {

    const { uid, name } = req;
    
    const token = await generarJWT(uid,name);

    res.json({
        ok: true,
        uid,
        name,
        token
    });

}

module.exports = {
    crearUsuario,
    loginUsuario,
    renovarToken
}