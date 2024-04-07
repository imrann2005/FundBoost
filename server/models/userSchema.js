import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    fullName : {
        type : String,

    },
    loginNumber:{
        type : Number,
    },
    city : {
        type : String,
    },
    state:{
        type : String,
    },
    landmark : {
        type : String,
    },
    
    
});

const userModel = mongoose.model('userModel',userSchema);

export default userModel;

