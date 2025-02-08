import mongoose, { Schema, type Document } from "mongoose";


// Define the user schema and model. Extend the Document interface to include the user fields.
export interface IUser extends Document {
    handle: string;
    name: string;
    email: string;
    password: string;
    description: string;
    image: string;
    links: string;
}

const userSchema = new Schema({
    handle: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    links: {
        type: String,
        default: "[]"
    }
})

const User = mongoose.model<IUser>("User", userSchema)
export default User