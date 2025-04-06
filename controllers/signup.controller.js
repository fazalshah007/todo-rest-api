import User from "../models/user.model.js"
import bcrypt from "bcrypt"

export const signupController = async (req, res) => {

    try {

        const { firstname, lastname, email, password } = req.body;

        if (!firstname || !lastname || !email || !password) {
            return res.status(403).json({
                message: "All fields are required."
            })
        }

        const userExist = await User.findOne({ email })

        if (userExist){ 
           return res.status(403).json({ message: "this email already exist." })
        }

        const hashPassword = bcrypt.hashSync(password, 10)

        const user = await User.create({
            firstname,
            lastname,
            email,
            password: hashPassword
        })

        res.status(201).json({
            message: "user create successfully.",
            user
        })

    } catch (error) {
        console.log(error);

    }


}
