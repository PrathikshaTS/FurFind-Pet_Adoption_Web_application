const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js'); 
const verifyToken = async(req, res, next) => {
    let token;
    let authHeader = req.headers.authorization||req.headers.Authorization;

    if(authHeader && authHeader.startsWith('Bearer')){
        token = authHeader.split(' ')[1];

        if(!token){
            return res.status(401).json({message:"No token provided"});
        }
        try {
            const decoded= jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id || decoded._id); 
            if (!user) {
                return res.status(401).json({ message: "User not found" });
            }

            req.user = user; 
           
             //console.log(decoded);
            next();
        } catch (error) {
            res.status(401).json({message:"Invalid token"});
        }
    }else{
        res.status(401).json({message:"No token provided"});
    }
}

module.exports = verifyToken;