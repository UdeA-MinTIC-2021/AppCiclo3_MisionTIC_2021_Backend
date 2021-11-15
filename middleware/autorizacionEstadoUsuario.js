
import { ObjectId } from 'mongodb';
import { getDB } from '../db/db.js';
import jwt_decode from "jwt-decode";

const autorizacionEstadoUsuario = async (req, res, next)=>{

    // 1. obtener usuario desde token
const token = req.headers.authorization.split('Bearer ')[1];
const user = jwt_decode(token)['http://localhost/userData']
console.log(user);
// 2. consultar usuario desde bd
const baseDeDatos = getDB();
await baseDeDatos.collection('Usuarios').findOne({ email: user.email }, async (err, response)=>{
    if(response){
        console.log("response consulta bd: ", response)
        // 3. verificar estado de usuario
        if(response.estado === 'rechazado'){
            // 4. si es rechazado devolver un error de autenticacion 
            res.sendStatus(401)
        }
        else{
            console.log('habilitado')
           // return next();
        }
    }
});
console.log('hola mundo soy un middleware')
// 5. si el usuario está pendiente o autorizado ejecutar next()
    next();
}

export default autorizacionEstadoUsuario;