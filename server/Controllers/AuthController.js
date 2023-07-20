import UserModel from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
    try{
        const { username, email, password } = req.body;

        if(!username) return next("Username is required");
        if(!email) return next("Email is required");
        if(!password) return next("Password is required");
        if(password < 6) return next("Password must be greater than 6 characters");

        // Checking existing email
        const userExists = await UserModel.findOne({ username });
        if(userExists) return next("Username already in use")

        // Hashing password
        const hashPass = await bcrypt.hash(password, 10);
        if(!hashPass) return next("Unable to create account");

        const user = UserModel.create({
            username,
            email,
            password: hashPass
        })

        res.status(201).send({
            success: true,
            message: "Account registered successfully",
            user
        })

    }catch(err){
        next(err);
    }
}

export const login = async (req, res, next) => {
    try{
        const { username, password } = req.body;

        if(!username) return next("email is required");
        if(!password) return next("Password is required");

        const user = await UserModel.findOne({ username });
        if(!user) return next("Invalid Credentials");

        const compare = bcrypt.compare(password, user.password);
        if(!compare) return next("Invalid Credentials");

        // Generating jwt token
        const token = jwt.sign({
            userId: user._id,
            username: user.username
        }, process.env.JWT_SECRET, { expiresIn: "24h"})


        res.status(200).send({
            success: true,
            message: "Login success",
            user: {
                username: user.username,
                email: user.email
            },
            token
        })

    }catch(err){
        next(err);
    }
}