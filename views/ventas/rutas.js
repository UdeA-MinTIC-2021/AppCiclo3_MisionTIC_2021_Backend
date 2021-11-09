import Express from 'express';
import { queryAllVentas, crearVenta, editarVenta, eliminarVenta } from '../../controllers/ventas/controller.js';


const rutasVentas = Express.Router();

const genericCallback = (res) =>(err, result) =>{
        if(err){
            res.status(500).send("Error consultando los Ventas")
        } 
        else{
            res.json(result);
        }
};

rutasVentas.route('/ventas').get((req, res)=>{
    console.log('alguien hizo get en la ruta /Ventas');
    queryAllVentas(genericCallback(res))
});

rutasVentas.route('/ventas').post((req, res)=>{
    crearVenta(req.body, genericCallback(res))
});

rutasVentas.route('/ventas/:id').patch((req, res)=>{
    editarVenta(req.params.id, req.body, genericCallback(res))
});

rutasVentas.route('/ventas/:id').delete((req, res)=>{
    eliminarVenta(req.params.id, genericCallback(res))
});

export default rutasVentas;