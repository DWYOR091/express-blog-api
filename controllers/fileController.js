const fileUpload = (req, res, next) => {
    try {
        res.status(200).json({ message: "ok" })
    } catch (error) {
        next(error)
    }
}

module.exports = { fileUpload }