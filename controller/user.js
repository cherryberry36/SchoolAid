import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import user from "../models/users.js"
import dotenv from "dotenv"
import validateSignupInput from "../validation/signup.js"
import validateSigninInput from "../validation/signin.js"
dotenv.config()

export const signin = async(req,res) => {

    const {errors, isValid} = validateSigninInput(req.body);    
        if(!isValid){
            return res.status(400).json(errors)
        }
        
    const {username, password} = req.body;
     
    try{
        const existingUser = await user.findOne({username});
         console.log(existingUser)
        if(!existingUser) return res.status(404).json({message: "user doesn't exist"})

       const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
          if(!isPasswordCorrect) return res.status(404).json({message: "invalid password"})

       const payload = { id: existingUser._id, username: existingUser.username};

       const token = jwt.sign(payload, process.env.SECRETKEY, {expiresIn:"1h"});


       res.status(200).json({success: true, token: 'Bearer ' + token});
    } catch(err){
        console.log(err)
        res.status(500).json({message: "something  went wrong"})

    }
}

export const signup = async(req,res) => {
    console.log(req.body)
    const {errors, isValid} = validateSignupInput(req.body);    
        if(!isValid){
            return res.status(400).json(errors)
        }


    const {username, email, password, confirmPassword} = req.body;

    try{
        const existingUser = await user.findOne({email});
        console.log(existingUser)
           if(existingUser) return res.status(404).json({message: "user already exists"})

           if (password != confirmPassword) return res.status(404).json({message: "passwords don't match"})

        const hashPassword = await bcrypt.hash(password, 12);

        const result = await user.create({email, password: hashPassword, username});

        const payload = {email: result.email, id: result._id, username: result.username};

        const token = jwt.sign(payload, process.env.SECRETKEY, {expiresIn:"1h"});

        res.status(200).json({success: true, token:'Bearer ' + token});

      } catch(err){
          console.log(err)
        res.status(500).json({message: "something went wrong"})

    }
}
    

