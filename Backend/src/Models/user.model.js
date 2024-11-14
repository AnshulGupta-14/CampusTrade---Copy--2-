import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[a-zA-Z0-9]+$/, "Only letters and numbers are allowed"],
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "Invalid email address"],
    },
    password: {
      type: String,
      required: [true, "Password field is required"],
      minlength: [8, "Password field must be at least 8 characters"],
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      match: [
        /^[a-zA-Z\s]+$/,
        "Full name must contain only letters and spaces",
      ],
      index: true,
    },
    regno: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
      match: [/^\d+$/, "Only digits are allowed"],
    },
    mobno: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^[6-9]\d{9}$/, "Please enter a valid number"],
    },
    otp: {
      type: String,
    },
    otpexpire: {
      type: Date,
    },
    avatar: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
    cart: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    refreshToken: {
      type: String,
    },
    ads: [
      {
        type: Schema.Types.ObjectId,
        ref: "Ad",
      },
    ],
    likedProducts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    chatIDs: [
      { 
        type: Schema.Types.ObjectId, 
        ref: 'Chat' 
      }
    ]
  },
  { timestamps: true }
);

// Encription of Password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  // console.log(this);
  // console.log(password);
  return await bcrypt.compare(password, this.password);
};

// Generate JWT token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
