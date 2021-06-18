const express = require('express');
const cors = require('cors')
const { dbConnection } = require('../db/config');

class Server {

    constructor(){

        this.app = express();
        this.app.use(cors());
        this.port = process.env.PORT;

        this.paths = {
            auth:       '/api/auth',
            events:      '/api/events'
        }

        this.conectarBD();

        this.middlewares();

        this.routes();
    }

    conectarBD(){
        dbConnection();
    }

    middlewares(){

        // lectura y paseo del body
        this.app.use(express.json());

        this.app.use(express.static('public'));

    }

    routes(){
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.events, require('../routes/events'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Aplicacion corriendo en http://localhost:${this.port}`);
        });
    }

}


module.exports = Server;

