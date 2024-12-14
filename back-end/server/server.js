const https=require('https');
const fs=require('fs');
const path=require('path');
const express=require('express');
const routes=require('../routes/routes');

const app=express();
const options={
    key:fs.readFileSync(path.join(__dirname,'../key.pem')),
    cert:fs.readFileSync(path.join(__dirname,'../cert.pem'))
}

const server=https.createServer(options,app);
app.use('/',routes);
const port=3000;
server.listen(port,()=>{
    console.log(`Server is running on https://localhost:${port}`);
});