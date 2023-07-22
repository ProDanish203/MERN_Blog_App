import { Router } from "express";
import { register, login, logout, getUser } from "../Controllers/AuthController.js";
import userAuth from "../Middlewares/authMiddleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/getUser", userAuth ,getUser);


export default router;