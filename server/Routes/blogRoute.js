import { Router } from "express";
import { publish, getBlogs, getSingleBlog, editBlog } from "../Controllers/BlogContoller.js";
import multer from "multer";
import userAuth from "../Middlewares/authMiddleware.js";


const router = Router();
const upload = multer({dest: "uploads"})


router.post("/publish", upload.single("banner"), publish);

router.get("/blogs", getBlogs);
router.get("/blog/:id", getSingleBlog);

router.put("/edit/:id", upload.single("banner"), editBlog);


export default router;