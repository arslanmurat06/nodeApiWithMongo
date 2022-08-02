import express from "express";
import { signin, signup } from "../controllers/authController.js";

const router = express.Router();

//Create user

router.post("/signup", signup);

//Signin

router.post("/signin",signin);

//Google Auth

router.post("/google");

export default router;
