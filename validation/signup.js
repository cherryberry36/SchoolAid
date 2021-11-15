import validator from "validator"
import isEmpty from "./is-empty.js"

export default function validateSignupInput(data){
    let errors = {};

    data.username =!isEmpty(data.username) ? data.username : "";
    data.email =!isEmpty(data.email) ? data.email : "";
    data.password =!isEmpty(data.password) ? data.password : "";
    data.confirmPassword =!isEmpty(data.confirmPassword) ? data.confirmPassword : "";

    if(!validator.isLength(data.username, {min: 2, max: 20})){
        errors.username = "Username must be between 2 and 30 characters";
    } 
    
    if(validator.isEmpty(data.username)) {
        errors.username = "Name field is required"
    }

    if(validator.isEmpty(data.email)) {
        errors.email = "Email field is required"
    }

    if(!validator.isEmail(data.email)) {
        errors.email = "Email is invalid"
    }

    if(validator.isEmpty(data.password)) {
        errors.password = "Password field is required"
    }
     
    if(!validator.isLength(data.password , {min: 6, max: 20})) {
        errors.password = "Password must be at least 6 characters"
    }

    if(validator.isEmpty(data.confirmPassword)) {
        errors.confirmpassword = "Confirm Password field is required"
    }

    if(!validator.equals(data.password, data.confirmPassword)) {
        errors.confirmPassword = "Passwords must match"
    }

    return {
        errors, 
        isValid: isEmpty(errors)
    }
}

