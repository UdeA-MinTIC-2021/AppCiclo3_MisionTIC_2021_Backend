import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js';


const queryAllVendedores = async (callback) =>{
    const baseDeDatos = getDB();
    await baseDeDatos.collection('vendedores').find({}).limit(50).toArray(callback);
}

const crearVendedor = async (datosVendedores, callback) => {
    
   
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
            const baseDeDatos = getDB();
        // crear codigo para crear vendedor en la bd
        await baseDeDatos.collection('vendedores').insertOne(datosVendedores, callback);
        } else{
            return "error";
        }

};

const editarVendedor = async (id, edicion, callback) =>{
    
    const filtroVendedor = {_id: new ObjectId(id)};
    const operacion = {
        $set: edicion,
    };
    const baseDeDatos = getDB();
    await baseDeDatos.collection('vendedores').findOneAndUpdate(filtroVendedor, operacion, { upsert: true }, callback);
}

const eliminarVendedor = async ( id, callback) => {
    const filtroVendedor = {_id: new ObjectId(id)}; 
    const baseDeDatos = getDB();
    await baseDeDatos.collection('vendedores').deleteOne(filtroVendedor, callback)
}


export { queryAllVendedores, crearVendedor, editarVendedor, eliminarVendedor };