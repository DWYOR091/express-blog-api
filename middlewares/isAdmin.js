const isAdmin = (...roles) => {
    return (req, res, next) => {
        if (req.user && !roles.includes(req.user.role)) {
            res.code = 403
            throw new Error("Unauthorized, access denied for this route")
        }
        next()
    }
}

module.exports = isAdmin