import mongoose from "mongoose"

const user = mongoose.Schema({
     username:{
         type: String,
         required: true,
         unique: true,
     },
     email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    }, 
    Date:{
        type:Date,
        default:Date.now,
    } 
    
})

export default mongoose.model("user", user)