import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import TokenSign from "../utils/tokenSign.js"

export const loginController = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(403).json({
                message: "All fields are required."
            })
        }

        const userExist = await User.findOne({ email })

        if (!userExist){ 
           return res.status(401).json({ message: "invalid email or password" })
        }

        const decode = bcrypt.compareSync(password, userExist.password)
        
        if(!decode){
            return res.status(401).json({ message: "invalid email or password" })
        }

        const access_token = TokenSign.signToken({ id: userExist._id, email: userExist.email })

        res.cookie("access_token", access_token, {
            secure: true,
            httpOnly: true,
            sameSite: 'none'
        })
        res.status(200).json({
            message: "logged in successfully",
            id: userExist._id,
            username: `${userExist.firstname} ${userExist.lastname}`,
            email: userExist.email,
            isLoggedIn: true,
            token : access_token
        })

    } catch (error) {
        console.log(error);

    }


}
