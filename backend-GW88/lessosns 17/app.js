import express from "express"
import User from "./src/schema/User.js"
import db from "./src/db/index.js "

const app = express()

app.get('/users' , async (req , res , next) => {
    const users = await User.find()
    res.status(200).json({ data : users})
})

db()
app.listen(3000 , () =>{
    console.log("Server is running 3000")
})  