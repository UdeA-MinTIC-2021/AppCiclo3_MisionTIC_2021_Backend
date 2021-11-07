// hacer el import express tradicional
// const express = require('express');

import Express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import cors from 'cors';



const stringConexion = 'mongodb+srv://cansuarez:Andres.2021@proyectoventas.dxa0c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const client = new MongoClient(stringConexion,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let conexion;

const app = Express();

app.use(Express.json());
app.use(cors());

app.get('/vendedores', (req, res)=>{
    console.log('alguien hizo get en la ruta /vendedores');
    conexion.collection('vendedor').find({}).limit(50).toArray((err, result)=>{
        if(err){
            res.status(500).send("Error consultando los vendedores")
        } 
        else{
            res.json(result);
        }
    })
});

app.post('/vendedores/nuevo', (req, res)=>{
    console.log(req)
    const datosVendedores = req.body;
    console.log('llaves: ', Object.keys(datosVendedores));
    try{
        if(
        Object.keys(datosVendedores).includes('nombres') &&
        Object.keys(datosVendedores).includes('apellidos') &&
        Object.keys(datosVendedores).includes('genero') &&
        Object.keys(datosVendedores).includes('tipo') &&
        Object.keys(datosVendedores).includes('documento') &&
        Object.keys(datosVendedores).includes('fecha') &&
        Object.keys(datosVendedores).includes('correo') &&
        Object.keys(datosVendedores).includes('telefono') &&
        Object.keys(datosVendedores).includes('direccion') &&
        Object.keys(datosVendedores).includes('comentarios')
        ){
        // crear codigo para crear vendedor en la bd
        conexion.collection('vendedor').insertOne(datosVendedores, (err, result)=>{
            if(err){
                console.error(err);
                res.sendStatus(500);
            } else {
                console.log(result)
                res.sendStatus(200);
            }
        });
        } else{
            res.sendStatus(500)
        }

    } catch{
        res.sendStatus(500)
    }
});

app.patch('/vendedores/editar', (req, res)=>{
    const edicion = req.body;
    console.log(edicion);
    const filtroVendedor = {_id: new ObjectId(edicion.id)};
    delete edicion.id;
    const operacion = {
        $set: edicion,
    };
    conexion.collection('vendedor').findOneAndUpdate(filtroVendedor, operacion, { upsert: true }, (err,result)=>{
    if(err){
        console.error('error actualizando el vendedor: ', err)
        res.sendStatus(500);
    }
    else{
        console.log('actualizado con éxito');
        res.sendStatus(200);
    }
    });
});

app.delete('/vendedores/eliminar', (req, res)=>{
    const filtroVendedor = {_id: new ObjectId(req.body.id)}; 
    conexion.collection('vendedor').deleteOne(filtroVendedor, (err, result)=>{
        if(err){
            console.error(err)
            res.sendStatus(500);
        }
        else{
            res.sendStatus(200);
        }
    });
});

const main = () =>{
    
    client.connect((err, db)=>{
        if(err){
            console.error("Error conectando a la base de datos");
        }
        conexion = db.db('vendedores');
        console.log('conexion exitosa');
        return app.listen(5000, ()=>{
            console.log('escuchando puerto 5000');
        });
    });

};

main();