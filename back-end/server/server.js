const express=require('express');
const routes=require('../routes/routes');
const cors = require('cors');

const app=express();
app.use(cors());
app.use(express.json());
app.use('/',routes);
const port=3001;
app.listen(port,()=>{
    console.log(`Server is running on https://localhost:${port}`);
});