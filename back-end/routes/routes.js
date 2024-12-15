const express=require('express');
const routes=express.Router();
const {sql,poolPromise}=require('../db/database');

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
module.exports=routes;