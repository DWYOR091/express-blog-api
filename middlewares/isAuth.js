const jwt = require('jsonwebtoken')
const { jwtSecretKey } = require('../config/kyes')
const isAuth = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]
    const payload = jwt.verify(token, jwtSecretKey)
    if (payload) {
        req.user = {
            _id: payload._id,
            name: payload.name,
            email: payload.email,
            role: payload.role
        }
        next()
    } else {
        res.code = 400
        throw new Error("invalid token!")
    }
}

module.exports = isAuth