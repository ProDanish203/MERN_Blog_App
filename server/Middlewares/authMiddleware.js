import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
    try{
        const {token} = req.cookies
        if(!token) return next("Authentication Failed!")

        const payload = await jwt.verify(token, process.env.JWT_SECRET)
        req.user = payload;
        next();

    }
    catch(err){
        next("Authentication Failed!")
    }
}

export default userAuth;