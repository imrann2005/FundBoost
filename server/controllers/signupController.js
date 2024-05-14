import { json } from 'express'
import auth from '../../d-app-client/src/Firebase/firebase-config.js';
import userModel from '../models/userSchema.js';

//import bcrypt from 'bycrypt';

const signupController = async (req, res) => {


    try {
        console.log(req.body);

        const { emailAddress } = req.body;
        const { loginNumber } = req.body;
        // console.log(email);
        const userEmail = await userModel.findOne({ email: emailAddress });
        const userPhone = await userModel.findOne({ loginNumber: loginNumber });
        // console.log(user); 
        if (!userEmail && !userPhone) {
            const newUser = new userModel(req.body);

            //Save user to DB
            await newUser.save();
            res.status(200).json({ msg: "user data saved succesfully" });
        }
        else if (userEmail) {

            res.status(409).json({ msg: "Email already in use, signin instead!", });
        }
        else if (userPhone) {
            res.status(409).json({ msg: "Phone number already in use,sign in instead" });
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "internal server error" });
    }
}


export default signupController;