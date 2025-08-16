const mongoose = require("mongoose");

module.exports = function () {
  const dbURI = "mongodb://localhost:27017/oqtepa_bot";
  mongoose
    .connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB", err));
};
