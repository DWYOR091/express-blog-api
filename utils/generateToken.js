const jwt = require('jsonwebtoken')
const { jwtSecretKey } = require('../config/kyes')

const generateToken = async (user) => {
    const token = jwt.sign({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    },
        jwtSecretKey,
        { expiresIn: "12h" })

    return token
}

module.exports = generateToken