import { Request, Response } from "express";
import slug from "slugify";
import User from "../models/User";
import { hashPassword, comparePasswords } from "../utils/auth";
import { validationResult } from "express-validator";
import { createToken } from "../utils/jwt";
import formidable from "formidable";
import cloudinary from "../config/cloudinary";
import { v4 as uuid } from "uuid";

export const createUser = async (req: Request, res: Response) => {

    // Errors Management
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    // verify email is unique
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        const error = new Error("Email already exists");
        res.status(409).json({ error: error.message });
        return;
    }

    const handle = slug(req.body.handle, "");
    const handleExists = await User.findOne({ handle });
    if (handleExists) {
        const error = new Error("Handle already exists");
        res.status(409).json({ error: error.message });
        return;
    }

    const user = new User(req.body);

    // hash password
    user.password = await hashPassword(password);
    // handle is a slugified version of the user's name
    user.handle = handle;

    try {
        await user.save();
        res.status(201).json("User created successfully" );
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

export const login = async (req: Request, res: Response) => {

    // verify email exists
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        const error = new Error("User not found");
        res.status(404).json({ error: error.message });
        return;
    }

    // verify password

    const passwordMatch = await comparePasswords(password, user.password);
    if (!passwordMatch) {
        const error = new Error("Invalid password");
        res.status(401).json({ error: error.message });
        return;
    }

    // generate JWT

    const token = createToken({ id: user._id });
    res.send(token);

}

export const getUser = async (req: Request, res: Response) => {
    res.json(req.user);
}

export const updateProfile = async (req: Request, res: Response) => {

    try {
        const { description, links } = req.body;

        const handle = slug(req.body.handle, "");
        const handleExists = await User.findOne({ handle });
        if (handleExists && handleExists._id.toString() !== req.user._id.toString()) {
            const error = new Error("Handle already exists");
            res.status(409).json({ error: error.message });
            return;
        }

        // update the user

        req.user.description = description;
        req.user.handle = handle;
        req.user.links = links;
        
        await req.user.save();
        res.send( "Profile updated successfully" );

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const uploadImage = async (req: Request, res: Response) => {
    const form = formidable({ multiples: false }); // create a new formidable form and set the multiples option to true
    try {
        form.parse(req, (error, fields, files) => {
           cloudinary.uploader.upload(files.file[0].filepath, { public_id: uuid() }, 
                async function (error, result) {
                        if(error) {
                            const error = new Error("Error uploading image");
                            res.status(400).json({ error: error.message });
                        }
                        if(result){
                            req.user.image = result.secure_url;
                            await req.user.save();
                            res.json({ image: result.secure_url});
                        }
                })       
        });
        
    } catch (e) {
        const error = new Error("Error uploading image");
        res.status(400).json({ error: error.message });
    }
    // upload image to cloudinary
}


export const getUserByHandle = async (req: Request, res: Response) => {
    
    try{
        const { handle } = req.params;
        const user = await User.findOne({ handle }).select("-password -email  -__v -_id");

        if (!user) {
            const error = new Error("User not found");
            res.status(404).json({ error: error.message });
            return;
        }
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const searchByHandle = async (req: Request, res: Response) => {
    try {
        const { handle } = req.body;
        const userExists = await User.findOne({ handle })
        if(userExists){
            res.status(409).json({ error: "Handle already exists" });
            return;
            
        }
        res.send(`${handle} is available`);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}