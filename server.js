import express from "express"
import mongoose from "mongoose"
import db from "./database/db.js"
import router from "./router/routes.js"
import passport from "passport"
import cors from "cors"


 
const app = express()


const port= process.env.PORT || 1234

app.get('/',(req,res)=> res.send("Hello"));
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use("/api",router)
app.use(passport.initialize())








app.listen(port,()=> console.log(`server is running on ${port}`))