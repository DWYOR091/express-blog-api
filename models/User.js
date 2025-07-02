const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minLength: 6 },
    //role 1: super admin, role 2: normal admin, role 3: user biasa,
    role: { type: Number, default: 3 },
    verificationCode: String,
    forgotPasswordCode: String,
    isVerify: { type: Boolean, default: false },
    // profilPic: { type: mongoose.Types.ObjectId, ref: 'file', required: true }
}, { timestamps: true })

const User = mongoose.model("user", userSchema)

module.exports = User