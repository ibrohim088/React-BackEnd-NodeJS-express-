import mongoose from "mongoose";

export default  function () {
    const dbURL = "mongodb://localhost:27017/oqtepa_bot";
    mongoose.connect(dbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.error("Couldn't connect to MongoDB" , err);
    });
}