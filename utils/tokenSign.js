import jwt from "jsonwebtoken"

class TokenSign {
    // constructor(data){
    //     this.data = data;
    // }
    static signToken(data) {
        return jwt.sign(data, process.env.ACCESS_TOKEN, { expiresIn: "1h" })
    };

    static decodeToken(token) {
       return jwt.verify(token, process.env.ACCESS_TOKEN)
    }
}

export default TokenSign;