const { User } = require('../models');
const { hashPassword } = require('../utils')

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

const signin = async (req, res) => {
    try {

    } catch (error) {
        console.log(error.stack);
        res.status(500).json({ message: error.message })
    }
}


module.exports = { signup, signin }