const express=require('express');
const routes=express.Router();

routes.get('/',(req,res)=>{
    res.send('Saludos desde Express');
});
module.exports=routes;