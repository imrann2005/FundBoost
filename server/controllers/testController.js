//testing controllers

const test = async (req,res) => { 
    res.status(200).json({msg : 'hi getting page'});
 }

 module.exports = test;