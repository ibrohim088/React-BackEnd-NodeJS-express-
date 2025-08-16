import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name:{
        type: mongoose.SchemaType.String
    },

})

const User = mongoose.model("User", userSchema)

export default User