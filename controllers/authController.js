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

        await sendEmail(email, "Email Verification Code", "", `
            <h2>Use this bellow code to verify your account:<h2>
            <p>${code}<p>
            `)


        user.verificationCode = code
        user.isVerify = true
        await user.save()




        res.status(200).json({ code: 200, status: true, message: "user verification code sent successfully" })
    } catch (error) {
        next(error)
    }
}


module.exports = { signup, signin, verifyEmail }