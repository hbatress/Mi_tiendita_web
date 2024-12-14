const https=require('https');
const fs=require('fs');
const path=require('path');
const express=require('express');

const app=express();
const options={
    key:fs.readFileSync(path.join(__dirname,'../key.pem')),
    cert:fs.readFileSync(path.join(__dirname,'../cert.pem'))
}

const server=https.createServer(options,app);
app.get('/',(req,res)=>{
    res.send('Hello World');
});
const port=3000;
server.listen(port,()=>{
    console.log(`Server is running on https://localhost:${port}`);
});