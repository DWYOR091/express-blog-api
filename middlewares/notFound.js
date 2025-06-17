const notFoundError = (req, res, next) => {
    res.status(404).send({ code: 404, status: false, message: "Api not found!" })
}

module.exports = notFoundError