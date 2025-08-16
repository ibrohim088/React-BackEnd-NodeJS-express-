const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    product: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    chatId: { type: Number, required: true },
    location: { type: String, required: false },
    totalPrice: { type: Number, required: false },
    deliveryFee: { type: Number, required: false },
    status: { type: String, required: false, default: "pending" },
    paymentMethod: { type: String, required: false },
    paymentStatus: { type: String, required: false },
  },
  {
    timestamps: true,
    versionKey: false,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

module.exports = mongoose.model("Cart", CartSchema);
