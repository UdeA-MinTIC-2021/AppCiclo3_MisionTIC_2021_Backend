
import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js';


const queryAllUsuarios = async (callback) =>{
    const baseDeDatos = getDB();
    await baseDeDatos.collection('Usuarios').find({}).limit(50).toArray(callback);
}

const crearUsuario = async (datosUsuarios, callback) => {
    
        const baseDeDatos = getDB();
        // crear codigo para crear Usuario en la bd
        await baseDeDatos.collection('Usuarios').insertOne(datosUsuarios, callback);
    };

const editarUsuario = async (id, edicion, callback) =>{
    
    const filtroUsuario = {_id: new ObjectId(id)};
    const operacion = {
        $set: edicion,
    };
    const baseDeDatos = getDB();
    await baseDeDatos.collection('Usuarios').findOneAndUpdate(filtroUsuario, operacion, { upsert: true }, callback);
}

const eliminarUsuario = async ( id, callback) => {
    const filtroUsuario = {_id: new ObjectId(id)}; 
    const baseDeDatos = getDB();
    await baseDeDatos.collection('Usuarios').deleteOne(filtroUsuario, callback)
}


export { queryAllUsuarios, crearUsuario, editarUsuario, eliminarUsuario };