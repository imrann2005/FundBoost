import userModel from "../models/userSchema.js";

const loginController = async (req, res) => {
    //console.log(req.body);
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email: email });
        if (user) {
            if (user.password === password) {
                console.log(`GO ahead`);
                res.status(200).json({ msg: "Login Successfull" })
            }
            else {
                res.status(403).json({ msg: "Wrong Password" });
            }
        }
        else{
            res.status(403).json({msg:"user not found, sign up instead"});
        }
    } catch (error) {
        console.log(error);
    }

}

export default loginController;

