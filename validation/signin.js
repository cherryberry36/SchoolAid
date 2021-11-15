import validator from "validator"
import isEmpty from "./is-empty.js"

export default function validateSigninInput(data){
    let errors = {};

    data.username =!isEmpty(data.username) ? data.username : "";
    data.password =!isEmpty(data.password) ? data.password : "";
   

    if(!validator.isLength(data.username, {min: 2, max: 20})){
        errors.username = "Username must be between 2 and 30 characters";
    } 
    
    if(validator.isEmpty(data.username)) {
        errors.username = "Username is required"
    }

    if(validator.isEmpty(data.password)) {
        errors.password = "Password field is required"
    }
     
    return {
        errors, 
        isValid: isEmpty(errors)
    }
}

