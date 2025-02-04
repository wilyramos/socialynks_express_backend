import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

// Middleware to authenticate user
// for send user through request middleware
declare global {
    namespace Express {
        interface Request {
            user?: IUser
        }
    }
}


export const authenticate = async (req: Request, res: Response, next: NextFunction) => {

    // validation 
    const bearer = req.headers.authorization;
    if (!bearer) {
        res.status(401).json({error: "Unauthorized"});
        return;
    }

    const token = bearer.split(" ")[1];

    // verify token
    if (!token) {
        res.status(401).json({error: "Unauthorized"});
        return;
    }

    // Decode token
    try {
        const result = jwt.verify(token, process.env.JWT_SECRET);

        // find user by id typescript
        if(typeof result === 'object' && result.id){
            const user = await User.findById(result.id).select('-password');
            if(!user){
                res.status(404).json({error: "User not found"});
                return;
            }
            // send user through request

            req.user = user;

            next();
        }
    } catch (error) {
        res.status(401).json({error: "jwt Unauthorized"});
    }

}