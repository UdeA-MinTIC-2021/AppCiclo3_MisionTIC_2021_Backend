
import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js';
import jwt_decode from "jwt-decode";


const queryAllUsuarios = async (callback) =>{
    const baseDeDatos = getDB();
    await baseDeDatos.collection('Usuarios').find({}).limit(50).toArray(callback);
}

const crearUsuario = async (datosUsuarios, callback) => {
    
        const baseDeDatos = getDB();
        // crear codigo para crear Usuario en la bd
        await baseDeDatos.collection('Usuarios').insertOne(datosUsuarios, callback);
    };

const consultarUsuario = async (id, callback) => {
        const baseDeDatos = getDB();
        await baseDeDatos.collection('Usuarios').findOne({ _id: new ObjectId(id) }, callback);
};

const consultarOcrearUsuario = async (req, callback) => {
//6.1. obtener datos desde el token
const token = req.headers.authorization.split('Bearer ')[1];
const user = jwt_decode(token)['https://rocky-beach-27823.herokuapp.com/userData']
console.log(user);
//6.2. con el correo o con el id de auth0 verificar si el usuario está en la bd o no
const baseDeDatos = getDB();
await baseDeDatos.collection('Usuarios').findOne({ email: user.email }, async (err, response)=>{
    console.log("response consulta bd: ", response)
    if(response){
        //7.1. si es usuario ya está devuelve la info del usuario 
        callback(err, response)
    }
    else{
        //7.2. si el usuario no está en la bd lo crea y devuelve la info
        user.auth0ID = user._id; 
        delete user._id;
        user.rol='Pendiente'
        user.estado = 'pendiente'
        await crearUsuario(user, (err, respuesta)=> callback(err, user));
    }
});

} 


const editarUsuario = async (id, edicion, callback) =>{
    
    const filtroUsuario = {_id: new ObjectId(id)};
    const operacion = {
        $set: edicion,
    };
    const baseDeDatos = getDB();
    await baseDeDatos.collection('Usuarios').findOneAndUpdate(filtroUsuario, operacion, { upsert: true, returnOriginal: true }, callback);
}

const eliminarUsuario = async ( id, callback) => {
    const filtroUsuario = {_id: new ObjectId(id)}; 
    const baseDeDatos = getDB();
    await baseDeDatos.collection('Usuarios').deleteOne(filtroUsuario, callback)
}


export { queryAllUsuarios, crearUsuario, consultarUsuario,  editarUsuario, eliminarUsuario, consultarOcrearUsuario };