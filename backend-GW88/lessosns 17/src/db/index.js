import mongoose from "mongoose"

export default function db() {   
    return mongoose.connect("mongodb://localhost:27017/school42")
    .then( (res) => { 
        console.lgo("Databasega ulandi")
    })
    .catch((err) => {
        console.log("xatolik bor")
    }); 
}

