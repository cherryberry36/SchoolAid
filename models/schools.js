import mongoose from "mongoose"

const schools = mongoose.Schema({
    category: {
        type: String,
        required: [true, "category field required"],

    },
     name:{
         type: String,
         required: [true, "name field required"],
     },
     address:{
        type: String,
        required: [true, "address field required"],
    },
    city:{
        type: String,
        required: [true, "city field required"],
    }, 
    state:{
        type: String,
        required: [true, "state field required"],
    },
    website:{
        type: String,
    },
    createReview:{
        type: mongoose.Types.ObjectId,
        ref: "createReview"
    }
})

export default mongoose.model("schools", schools)