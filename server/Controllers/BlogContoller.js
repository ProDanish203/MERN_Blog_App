import BlogModel from "../Models/BlogModel.js";
import fs from "fs";
import jwt from "jsonwebtoken";

export const publish = async (req, res, next) => {
    try{

        const {token} = req.cookies
        if(!token) return next("Authentication Failed!")

        const payload = await jwt.verify(token, process.env.JWT_SECRET)
        const author = payload.userId;

        const {title, summary, content} = req.body;
        const {originalname, path} = req.file
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1];
        const newPath = path+'.'+ext
        fs.renameSync(path, newPath);

        if(!title) return next("Title is required")
        if(!summary) return next("Summary is required")
        if(!content) return next("Blog content is required")

        const blog = await BlogModel.create({
            title, summary, content, banner: newPath, author
        })

        res.status(200).send({
            success: true,
            message: "Blog Published",
            blog
        })

    }catch(error){
        next(error)
    }
}

export const getBlogs = async (req, res, next) => {
    try{
        const blogs = await BlogModel.find()
        .populate("author", ['username'])
        .sort({createdAt: -1})
        .limit(20);

        res.status(200).json({
            success: true,
            blogs
        })

    }catch(error){
        next(error)
    }
}

export const getSingleBlog = async (req, res, next) => {
    try{
        const {id} = req.params;
        const blog = await BlogModel.findById(id)
        .populate("author", ['username'])

        res.status(200).send({
            success: true,
            blog
        })

    }catch(error){
        next(error)
    }
}

export const editBlog = async (req, res, next) => {
    try{
        
        const {token} = req.cookies
        if(!token) return next("Authentication Failed!")

        const payload = await jwt.verify(token, process.env.JWT_SECRET)
        const author = payload.userId;

        const {id} = req.params;
        // const newPath = null
        // if(req.file){
        //     const {originalname, path} = req.file
        //     const parts = originalname.split('.')
        //     const ext = parts[parts.length - 1];
        //     newPath = path+'.'+ext
        //     fs.renameSync(path, newPath);
        // }

        const {title, summary, content} = req.body;

        const blog = await BlogModel.findById(id);
        const isAuthor = author == blog.author;
        if(isAuthor){
            const updateBlog = await BlogModel.findByIdAndUpdate(id, {
                title, summary, content, 
                // banner: newPath ? newPath : blog.banner
            })
        }else{
            return next("You're not authorized to make changes to this post");
        }

        res.status(200).send({
            success: true,
            message: "Blog Updated",
        })

    }catch(error){
        next(error)
    }
}