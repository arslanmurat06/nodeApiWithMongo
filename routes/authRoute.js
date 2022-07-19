import express from "express";
import { signup } from "../controllers/authController.js";

const router = express.Router();

//Create user

router.post("/signup", signup);

//Signin

router.post("/signin");

//Google Auth

router.post("/google");

export default router;
