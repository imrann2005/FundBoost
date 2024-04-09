//testing controllers
import userModel from "../models/userSchema.js";

const test = async (req, res) => {

    try {
        //console.log(req.body);
        const users = await userModel.find({});
        if (users) {
            res.status(200).json({ usersList: users, msg: "All users fetched successfully!" });
        }
        else {
            res.status(400).json({ msg: "Unable to fetch users! try again" });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ msg: "Internal server error" });
    }
}

export const getSingleUser = async (req, res) => {
    // console.log(req.body);
    console.log(req.params);

    const { id } = req.params;
    try {
        const user = await userModel.findOne({ _id: id });
        if (user) {
            res.status(200).json({ userDetails : user,msg: "User found!" });
        }
        else {
            res.status(404).json({ msg: "User not found" });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ msg: "Internal server error" });
    }


}
export default test;