import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({ ...req.body, password: hashedPassword });
    await newUser.save();

    return res.status(200).json("User has been created");
  } catch (error) {
    next(error);
  }
};


export const signin = async(req, res, next) => {
  try {

    const user = await User.findOne({name : req.body.name});
   
    if(!user) return next(createrError(404,"User not found!"));

    var isPasswordCorrect =  bcrypt.compare(req.body.password, user.password);

    if(!isPasswordCorrect) return next(createError(400,"Please check credentials!"));

    const token = jwt.sign({id:user._id}, process.env.TOKEN_SECRET);
  
    const  {password, ...others} = user._doc
    
    res.cookie("access_token", token,{
      httpOnly:true
    }).status(200).json(others);

  } catch (error) {
    console.log(error)
  }
};
