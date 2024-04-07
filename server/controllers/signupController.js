const { json } = require("express");


const signupController = async(req,res) => { 

    
    try {
       console.log(req.body); 
       res.status(200).json(req.body);
    } catch (error) {
        console.log(error);
        res.status(400).json({msg:"internal server error"});
    }
 }

module.exports = signupController;