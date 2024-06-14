import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose, { Schema } from "mongoose";

const userShema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true
        },
        refreshToken: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now()
        }
    }
);

// run pre hook to encrypt the password 
userShema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next();
});

// compare the password 
userShema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

// genrate access token 

userShema.methods.generateAccessToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            name: this.name,
            role: this.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY },
    )
};

// genrate refress token 
userShema.methods.generateRefreshToken = async function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY },
    )
};

export const User = mongoose.model('User', userShema);