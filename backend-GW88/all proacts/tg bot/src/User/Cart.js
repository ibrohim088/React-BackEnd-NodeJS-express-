import moongose from "mongoose";

const CartSchema = new moongose.Schema(
    {
        product: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        chatId: { type: Number, required: true },
        location: { type: String, required: false },
        status: { type: String, required: false, default: "pending" },

    },
    {
        timestamps: true,
        versionKey: false,
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
    }
);

export default moongose.model("Cart", CartSchema);