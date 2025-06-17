const { User } = require('../models');

const signup = async (req, res) => {
    const { name, email, password, role } = req.body
    try {
        await User.create({ name, email, password, role })
        res.status(201).json({ message: "user register successfully!" })
    } catch (error) {
        console.log(error.stack);
        res.status(500).json({ message: error.message })
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