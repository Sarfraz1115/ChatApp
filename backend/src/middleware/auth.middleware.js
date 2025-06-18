import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next ) => {
    try {
        const token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(401).json({message: "Unauthorized - No TOken Provided"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userID);
        // const user = await User.findById
        if(!decoded){
            return res.status(401).json({message: "Unauthorized - Invalid Token "});
        }
        if(!user){
            return res.status(401).json({message: "User not Found"});
        }
        req.user = user
        next();
    } catch (error) {
        console.log("Error in ProtectRoute middleware: ", error.message);
        res.status(501).json({message: "Internal server error"})
    }
}