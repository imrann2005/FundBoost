const express = require('express');
const routes = require('./routes.js');
const PORT = 4000;

const app = express();

//Middleware

app.use(express.json());

app.use('/',routes);

app.get("/",(req,res)=>{
    res.status(200).json({msg : 'Getting page'});
})
app.listen(PORT,()=>{
    console.log(`Server started on port : ${PORT}`);
})