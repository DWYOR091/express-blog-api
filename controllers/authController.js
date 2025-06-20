const { User } = require('../models');
const { hashPassword, comparePassword, generateToken, generateCode, sendEmail } = require('../utils');

const signup = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body
        const isEmailExist = await User.findOne({ email })
        if (isEmailExist) {
            res.code = 400
            throw new Error('Email already exist')
        }

        const hashedPassword = await hashPassword(password)
        await User.create({ name, email, password: hashedPassword, role })
        res.status(201).json({ code: 201, status: true, message: "user register successfully!" })
    } catch (error) {
        next(error)
    }
}

const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            res.code = 404
            throw new Error("user not found!")
        }

        if (user.isVerify === false) {
            res.code = 404
            throw new Error("user must be verify first")
        }

        const isMatch = await comparePassword(password, user.password)
        if (!isMatch) {
            res.code = 401
            throw new Error('invalid credentials!')
        }

        const token = await generateToken(user)

        res.status(200).json({ code: 200, status: true, message: "Berhasil login", data: { token } })
    } catch (error) {
        next(error)
    }
}

const verifyEmail = async (req, res, next) => {
    try {
        const { email } = req.body
        console.log(email);
        const user = await User.findOne({ email })
        if (!user) {
            res.code = 404
            throw new Error("user not found")
        }
        const code = generateCode(6)

        await sendEmail(email, "Email Verification Code", code, "verify your account")

        user.verificationCode = code
        await user.save()

        res.status(200).json({ code: 200, status: true, message: "user verification code sent successfully" })
    } catch (error) {
        next(error)
    }
}

const verifyUser = async (req, res, next) => {
    try {
        const { email, code } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            res.code = 404
            throw new Error("user not found!")
        }

        if (user.verificationCode !== code) {
            res.code = 400
            throw new Error("invalide code!")
        }

        user.isVerify = true
        user.verificationCode = null

        await user.save()

        res.status(200).json({ code: 200, status: true, message: "user verification succesfully!" })
    } catch (error) {
        next(error)
    }
}

const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            res.code = 404
            throw new Error("user not found!")
        }

        const code = generateCode(6)
        await sendEmail(
            user.email,
            "Forgot Password Code",
            code,
            "verification forgot password")

        user.forgotPasswordCode = code
        await user.save()

        res.status(200).json({
            code: 200,
            status: true,
            message: "forgot password code sent succesfully!"
        })
    } catch (error) {
        next(error)
    }
}

const recoverPassword = async (req, res, next) => {
    try {
        const { email, code, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            res.code = 404
            throw new Error("user not found")
        }

        if (user.forgotPasswordCode !== code) {
            res.code = 400
            throw new Error("invalid code")
        }

        const hashedPassword = await hashPassword(password)
        user.password = hashedPassword
        user.forgotPasswordCode = null
        await user.save()

        res.status(200).json({
            code: 200,
            status: true,
            message: "recover password successfully!"
        })

    } catch (error) {
        next(error)
    }
}

const changePassword = async (req, res, next) => {
    try {
        const { oldPassword, newPassword } = req.body
        const { _id } = req.user
        const user = await User.findById(_id)
        if (!user) {
            res.code = 404
            throw new Error("user not found")
        }

        const match = await comparePassword(oldPassword, user.password)
        if (!match) {
            res.code = 400
            throw new Error("Old password doesnt match")
        }

        if (oldPassword === newPassword) {
            res.code = 400
            throw new Error("You are providing old password")
        }

        const hashedPassword = await hashPassword(newPassword)
        user.password = hashedPassword
        await user.save()

        res.status(200).json({ code: 200, status: true, message: "Password changed successfully" })
    } catch (error) {
        next(error)
    }
}

const updateProfile = async (req, res, next) => {
    try {
        const { name, email } = req.body
        const { _id } = req.user
        const user = await User.findById(_id).select("-password -verificationCode -forgotPasswordCode")
        if (!user) {
            res.code = 404
            throw new Error("user not found!")
        }

        const isEmailExist = await User.findOne({ email })
        if (isEmailExist && email === isEmailExist.email && String(_id) !== String(isEmailExist._id)) {
            res.code = 400
            throw new Error("Email already used")
        }

        if (!isEmailExist && email !== user.email && email !== "") {
            user.isVerify = false
        }

        user.name = name ? name : user.name
        user.email = email ? email : user.email

        await user.save()
        res.status(200).json({
            code: 200, status: true, message: "update profile successfully", data: user
        })
    } catch (error) {
        next(error)
    }
}

// const updateProfile = async (req, res, next) => {
//     try {
//         const { name, email } = req.body;
//         const { _id } = req.user;

//         const user = await User.findById(_id).select("-password -verificationCode -forgotPasswordCode");

//         if (!user) {
//             res.code = 404
//             throw new Error("user not found")
//         }

//         if (email !== undefined && email !== null && email !== user.email) {
//             const newEmail = email === "" ? user.email : email;

//             if (newEmail !== user.email && newEmail !== "") {
//                 const isEmailExist = await User.findOne({ email: newEmail });

//                 if (isEmailExist && String(isEmailExist._id) !== String(_id)) {
//                     res.code = 400
//                     throw new Error("Email already used")
//                 }
//                 user.email = newEmail;
//                 user.isVerify = false;
//             }
//         }

//         if (name !== undefined && name !== null && name !== "") {
//             user.name = name;
//         }

//         await user.save();

//         return res.status(200).json({
//             code: 200,
//             status: true,
//             message: "Profile updated successfully!",
//             data: {
//                 user
//             }
//         });

//     } catch (error) {
//         next(error);
//     }
// };

module.exports = {
    signup, signin, verifyEmail, verifyUser, forgotPassword, recoverPassword
    , changePassword, updateProfile
}