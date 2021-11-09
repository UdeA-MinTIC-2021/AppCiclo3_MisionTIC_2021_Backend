// hacer el import express tradicional
// const express = require('express');

import Express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { conectarBD, getDB } from './db/db.js';
import rutasVendedores from './views/vendedores/rutas.js';
import rutasVentas from './views/ventas/rutas.js';


dotenv.config({ path:'./.env' });

const app = Express();


app.use(Express.json());
app.use(cors());
app.use(rutasVendedores)
app.use(rutasVentas)


const main = () =>{
        return app.listen(process.env.PORT, ()=>{
        console.log(`escuchando puerto ${process.env.PORT}`);
    });
};

conectarBD(main);