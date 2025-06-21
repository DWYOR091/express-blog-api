const jwt = require('jsonwebtoken')
const { jwtSecretKey } = require('../config/kyes')
const isAuth = (req, res, next) => {
    try {
        const authorization = req.headers.authorization && req.headers.authorization.split(" ")
        if (!authorization || authorization[0] !== "Bearer") {
            res.code = 401
            throw new Error("Unauthorization!")
        }

        const token = authorization.length > 1 ? authorization[1] : null

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
    } catch (error) {
        next(error)
    }
}

module.exports = isAuth