import Express from 'express';
import { queryAllVendedores, crearVendedor, editarVendedor, eliminarVendedor } from '../../controllers/vendedores/controller.js';


const rutasVendedores = Express.Router();

const genericCallback = (res) =>(err, result) =>{
        if(err){
            res.status(500).send("Error consultando los vendedores")
        } 
        else{
            res.json(result);
        }
};

rutasVendedores.route('/miaplicacion').get((req, res)=>{
    console.log('alguien hizo get en la ruta /vendedores');
    queryAllVendedores(genericCallback(res))
});

rutasVendedores.route('/miaplicacion').post((req, res)=>{
    crearVendedor(req.body, genericCallback(res))
});

rutasVendedores.route('/miaplicacion/:id').patch((req, res)=>{
    editarVendedor(req.params.id, req.body, genericCallback(res))
});

rutasVendedores.route('/miaplicacion/:id').delete((req, res)=>{
    eliminarVendedor(req.params.id, genericCallback(res))
});

export default rutasVendedores;