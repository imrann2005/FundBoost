import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import router from '../server/routes.js';

const PORT = 4000;

const app = express();

async function connect() {
    try {
    const result = await mongoose.connect('mongodb+srv://imwebdev01:shamshad05@cluster0.q1h1cbg.mongodb.net/?retryWrites=true&w=majority');
    console.log(`Mongo db conected`);
        //console.log(result);
} catch (error) {
    console.log(error);
}
}

connect();



//Middleware

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/',router);

app.get("/",(req,res)=>{
    res.status(200).json({msg : 'Getting page'});
})
app.listen(PORT,()=>{
    console.log(`Server started on port : ${PORT}`);
})