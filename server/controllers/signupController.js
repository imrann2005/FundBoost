import {json} from 'express'
import auth from '../../d-app-client/src/Firebase/firebase-config.js';
import userModel from '../models/userSchema.js';

//import bcrypt from 'bycrypt';

const signupController = async(req,res) => { 

    
    try {
       console.log(req.body); 

         const {email}  = req.body;

       // console.log(email);
        const user = await userModel.findOne({email : email});
       // console.log(user);
        if(user){
            
            res.status(409).json({msg:"User already exists,signin instead!",});
        }
        if(!user){
            const newUser = new userModel(req.body);
            await newUser.save();
            res.status(200).json({msg:"user data saved succesfully"});
        }
      
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"internal server error"});
    }
 }

 
export default signupController;