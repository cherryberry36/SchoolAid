import jwt from "jsonwebtoken"
import createReview from "../models/createReview.js"
import dotenv from "dotenv"
import mongoose from "mongoose"
import validatePostsInput from "../validation/createReview.js"

dotenv.config()


export const makeReview = async(req,res) => {
    const {errors, isValid} = validatePostsInput(req.body);

    if (!isValid){
        return res.status(400).json(errors)
    }
   const newReview = new createReview({ 
       text: req.body.text,
       username: req.body.username,
       user: req.user.id
    })
    newReview.save()
 .then(createReview => res.json({review: createReview}));
 console.log(newReview)
}

export const updateReview = async(req,res) => {
    try {
    
        if( !Object.keys(req.body).length) {
           return res.status(400).json({ status: false, message: "You must provide update details"})
        } 
        const update= await createReview.findOne({reveiwId: req.params.reviewId})
        if (req.body.text !== undefined && text.trim() !== ""){
            createReview.text = text
         }
         const newData = await createReview.save()
         return res.status(200).json({success: true, message:"successfully updated", newData})
} catch (error) {

    return res.status(500).json({ success: false, message: error})
 }
}


export const findReview =  async(req,res) => {
    const findReview = await createReview.find({ })
    return res.status(200).json({message: " successful", schools:findReview})
      
}