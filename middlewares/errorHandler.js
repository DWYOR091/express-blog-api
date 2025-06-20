const errorHandler = (err, req, res, next) => {
    const code = res.code ? res.code : 500
    let message = err.message || 'INTERNAL SERVER ERROR'
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        res.code = 400
        message = 'invalid ID format'
    }

    res.status(code).json({
        code: code,
        status: false,
        message: message,
        stack: err.stack
    })
}

module.exports = errorHandler