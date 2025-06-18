const generateCode = (length) => {
    const code = String(Math.random()).split(".")[1].split("")
    if (!code.length) {
        code.length = 4
    }

    code.length = length
    const result = code.join('')
    return result
}

module.exports = generateCode