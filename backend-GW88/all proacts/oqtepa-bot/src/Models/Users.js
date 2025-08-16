const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    username: { type: String, required: false, default: null },
    admin: { type: Boolean, default: false },
    chatId: { type: Number, required: true },
    phone: { type: String, required: false },
    action: { type: String, required: false },
  },
  {
    timestamps: true,
    versionKey: false,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

module.exports = mongoose.model("User", UserSchema);
