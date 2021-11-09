import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js';


const queryAllVentas = async (callback) =>{
    const baseDeDatos = getDB();
    await baseDeDatos.collection('Ventas').find({}).limit(50).toArray(callback);
}

const crearVenta = async (datosVentas, callback) => {    
        const baseDeDatos = getDB();
        await baseDeDatos.collection('Ventas').insertOne(datosVentas, callback);
};

const editarVenta = async (id, edicion, callback) =>{
    
    const filtroVenta = {_id: new ObjectId(id)};
    const operacion = {
        $set: edicion,
    };
    const baseDeDatos = getDB();
    await baseDeDatos.collection('Ventas').findOneAndUpdate(filtroVenta, operacion, { upsert: true }, callback);
}

const eliminarVenta = async ( id, callback) => {
    const filtroVenta = {_id: new ObjectId(id)}; 
    const baseDeDatos = getDB();
    await baseDeDatos.collection('Ventas').deleteOne(filtroVenta, callback)
}


export { queryAllVentas, crearVenta, editarVenta, eliminarVenta };