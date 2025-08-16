import sdfghjk from "mongoose";

const UserSchema = new sdfghjk.Schema(
    {
        firstName: { type: String },
        username: { type: String, default: null },
        admin: { type: Boolean, default: false },
        chatId: { type: String, required: true, unique: true },
        phone: { type: String, required: false, unique: true },
        action: { type: String, required: false },
    },
    {
        timestamps: true,
        versionKey: false,
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
    }
);

export default sdfghjk.model("User", UserSchema);