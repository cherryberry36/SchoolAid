import School from "../models/schools.js"

export const createSchools = (req,res) => {
  
  
   const newSchool = new School({ 
       category: req.body.category,
       name: req.body.name,
       address: req.body.address,
       city: req.body.city,
       state: req.body.state,
       website: req.body.website,
    })
    newSchool.save()
 .then(newSchool => res.json({schools: newSchool}))
 .catch(err => {
     console.log(err)
     res.status(400).json({message:"Something went wrong"})})
}

 export const findSchool =  async(req,res) => {
        const findSchool = await School.find({ })
        return res.status(200).json({message: " successful", schools:findSchool})
          
}

export const findByPagenate = async(req,res) => {

      const findByPagenate = await School.find({})
      const page = req.body.page
      const limit = req.body.limit
      const indexOne = (page - 1) * limit
      const indexTwo = (page * limit)
      const result = findByPagenate.slice(indexOne,  indexTwo)
      return res.status(200).json({message: "successful", school: result})
}

export const  updateSchool= async(req,res) => {
   let userId = req.id
   try {
      console.log(req.params)
      
      if( !Object.keys(req.body).length) {
         return res.status(400).json({ status: false, message: "You must provide update details"})
      } 
      console.log(req.body.name, req.body.category, req.body.address) 
      const { name, category, address, city, state } = req.body
      const school= await School.findOne({ schoolId: req.params.schoolId }) 
      if (name !== undefined && category.trim() !== ""){
         school.name = name
      }
      if (category !== undefined && category.trim() !== ""){
         school.category = category
      } 
      if (address !== undefined && address.trim() !== ""){
         school.address = address
      } 
      if (state !== undefined && state.trim() !== ""){
         school.state = state
      } 
      if (city !== undefined && city.trim() !== ""){
         school.city = city
      } 
      const data = await school.save()
      return res.status(200).json({success: true , message:"Successfully updated", data })
       
      console.log("Update", updateSchool)

   } catch (error) {

      console.log(error)
      return res.status(500).json({ success: false, message: error})
   }
}



