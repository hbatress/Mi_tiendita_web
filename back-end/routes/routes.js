const express=require('express');
const routes=express.Router();
const {sql,poolPromise}=require('../db/database');
routes.use(express.json()); 

routes.get('/',(req,res)=>{
    res.send('Saludos desde Express');
});

routes.get('/productos',async(req,res)=>{
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .execute('Listar_productos');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).send('Error en la consulta');
    }

});

routes.get('/clientes',async(req,res)=>{
    const estado = req.query.estado; // Suponiendo que el ID del cliente se envía como parámetro de consulta
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('estado', sql.Int, estado) // Enviar el parámetro al procedimiento almacenado
            .execute('Listar_clientes_pendientes'); // Nombre del procedimiento almacenado
        res.json(result.recordset);
    } catch (error) {
        res.status(500).send('Error en la consulta');
    }

});

routes.post('/procesar_orden', async (req, res) => {
    const { id_usuario, id_direccion, id_estado, orden_detalles, id_metodo_pago, nombre_factura, nit } = req.body; // Suponiendo que los datos se envían en el cuerpo de la solicitud
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id_usuario', sql.Int, id_usuario)
            .input('id_direccion', sql.Int, id_direccion)
            .input('id_estado', sql.Int, id_estado)
            .input('orden_detalles', sql.NVarChar(sql.MAX), orden_detalles)
            .input('id_metodo_pago', sql.Int, id_metodo_pago)
            .input('nombre_factura', sql.VarChar(200), nombre_factura)
            .input('nit', sql.VarChar(20), nit)
            .execute('procesar_orden'); 
        res.json(result.recordset);
    } catch (error) {
        res.status(500).send('Error en la consulta');
    }
});

module.exports=routes;