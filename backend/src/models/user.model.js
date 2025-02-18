import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
    {
        fullname: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        username: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            index: true
        },
        password: {
            type: String,
            required: true,
        },
        profilePic: {
            type: String,
        },
        role:{
            type:String,
            enum:["admin","user"],
            default:"user",
        }
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.generateToken = function () {
    return jwt.sign(
        { _id: this._id },
        process.env.TOKEN_SECRET,
        { expiresIn: "7d" }
    )
};

userSchema.methods.validatePassword = function (password) {
    return bcrypt.compare(password, this.password);
}
export const User = mongoose.model("User", userSchema);