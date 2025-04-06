import User from "../models/user.model.js"
import TokenSign from "../utils/tokenSign.js"

const auth = async (req, res, next) => {

    const token = req.cookies.access_token
   

    if(!token){
        return res.status(400).json({
            message: "Access Denied! token required please."
        })
    }

    try {

        const data = await TokenSign.decodeToken(token)

        const user = await User.findById({ _id: data.id })

        if(!user){

            return res.status(404).json({
                message: "invalid Token."
            })

         
        }else{

            req.user = user._id
            next()
           
        }
        
    } catch (error) {
        return res.status(403).json({
            message: "invalid Token."
        })
        
    }

}

export default auth;