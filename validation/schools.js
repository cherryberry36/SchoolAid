import validator from "validator"
import isEmpty from "./is-empty.js"

export default function validateSchoolInput(data){
    let errors = {};

    data.name =!isEmpty(data.name) ? data.name : "";
    data.address =!isEmpty(data.address) ? data.address : "";
    data.city =!isEmpty(data.city) ? data.city : "";
    data.state =!isEmpty(data.state) ? data.state : "";

    if(!validator.isLength(data.name, {min: 2, max: 40})){
        errors.name = "Schoolname must be between 2 and 40 characters";
    } 
    
    if(validator.isEmpty(data.name)) {
        errors.name = "This field is required"
    }
    
    if(validator.isEmpty(data.address)) {
        errors.address = "This field is required"
    }

    if(validator.isEmpty(data.city)) {
        errors.city = "This field is required"
    }
    if(validator.isEmpty(data.state)) {
        errors.state = "This field is required"
    }

    if(!isEmpty(data.website)){
        if(!validator.isURL(data.website)){
            errors.website =" Not a valid URL";
        }
    }
     
    return {
        errors, 
        isValid: isEmpty(errors)
    }
}
