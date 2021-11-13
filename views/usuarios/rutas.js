import Express from 'express';
import { queryAllUsuarios, crearUsuario, editarUsuario, eliminarUsuario } from '../../controllers/usuarios/controller.js';


const rutasUsuarios = Express.Router();

const genericCallback = (res) =>(err, result) =>{
        if(err){
            res.status(500).send("Error consultando los Usuarios")
        } 
        else{
            res.json(result);
        }
};

rutasUsuarios.route('/usuarios').get((req, res)=>{
    console.log('alguien hizo get en la ruta /Usuarios');
    queryAllUsuarios(genericCallback(res))
});

rutasUsuarios.route('/usuarios').post((req, res)=>{
    crearUsuario(req.body, genericCallback(res))
});

rutasUsuarios.route('/usuarios/:id').patch((req, res)=>{
    editarUsuario(req.params.id, req.body, genericCallback(res))
});

rutasUsuarios.route('/usuarios/:id').delete((req, res)=>{
    eliminarUsuario(req.params.id, genericCallback(res))
});

export default rutasUsuarios;