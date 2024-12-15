const express=require('express');
const routes=require('../routes/routes');


const app=express();
app.use(express.json());
app.use('/',routes);
const port=3000;
app.listen(port,()=>{
    console.log(`Server is running on https://localhost:${port}`);
});