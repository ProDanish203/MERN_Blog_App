import { Router } from "express";
import { publish, getBlogs, getSingleBlog } from "../Controllers/BlogContoller.js";
import multer from "multer";

const router = Router();
const upload = multer({dest: "uploads"})


router.post("/publish", upload.single("banner"), publish);

router.get("/blogs", getBlogs);
router.get("/blog/:id", getSingleBlog);

export default router;