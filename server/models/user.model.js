import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new Schema(
    {
        fullName: {
            type: String,
            required: [true, "Full name is required"],
            minLength: [5, "Full name must be atleast 5 characters long"],
            maxLength: [
                30,
                "Full name must not exceed more than 30 characters",
            ],
            lowercase: true,
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
                "Please fill a valid email address",
            ],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minLength: [8, "Password must be atleast 8 characters"],
            select: false,
            // match: [
            //   /^(?=.*?[0-9])(?=.*?[A-Za-z]).{8,32}$/,
            //   "Please fill a valid email address",
            // ],
        },
        avatar: {
            public_id: {
                type: String,
            },
            secure_url: {
                type: String,
            },
        },
        role: {
            type: String,
            enum: ["USER", "ADMIN"],
            default: "USER",
        },
        forgotPasswordToken: String,
        forgotPasswordExpiry: Date,
        subscription: {
            id: String,
            status: String,
        },
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods = {
    generateJWTToken: async function () {
        return await jwt.sign(
            {
                id: this._id,
                email: this.email,
                subscription: this.subscription,
                role: this.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRY,
            }
        );
    },
    comparePassword: async function (plainTextPassword) {
        return await bcrypt.compare(plainTextPassword, this.password);
    },

    generatePasswordResetToken: async function () {
        const resetToken = crypto.randomBytes(20).toString("hex");

        this.forgotPasswordToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000;

        return resetToken;
    },
};

const User = model("User", userSchema);

export default User;
