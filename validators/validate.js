const { validationResult } = require('express-validator')
const validate = (req, res, next) => {
    const result = validationResult(req)
    const mappedErrors = {}
    // console.log(result);
    if (result.errors.length === 0) {
        return next()
    }

    result.errors.map(err => {
        mappedErrors[err.path] = err.msg
    })

    res.status(400).json(mappedErrors)
}

module.exports = validate