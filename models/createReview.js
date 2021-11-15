import mongoose from "mongoose"

const createReview = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
   
})

export default mongoose.model("createReview", createReview)