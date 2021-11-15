// hacer el import express tradicional
// const express = require('express');

import Express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { conectarBD, getDB } from './db/db.js';
import rutasVendedores from './views/vendedores/rutas.js';
import rutasVentas from './views/ventas/rutas.js';
import rutasUsuarios from './views/usuarios/rutas.js';
import { auth } from 'express-oauth2-jwt-bearer';


dotenv.config({ path:'./.env' });

const app = Express();


app.use(Express.json());
app.use(cors());


const checkJwt = auth({
    audience: 'api-autenticacion-ventas-mintic',
    issuerBaseURL: `https://misiontic-app.us.auth0.com/`,
  });

  // 4 y 5. enviarle el token a Auth0 para que diga si es valido o no
app.use(checkJwt);

app.use(rutasVendedores)
app.use(rutasVentas)
app.use(rutasUsuarios)


const main = () =>{
        return app.listen(process.env.PORT, ()=>{
        console.log(`escuchando puerto ${process.env.PORT}`);
    });
};

conectarBD(main);