const bcrypt = require('bcryptjs')

const comparePassword = async (password, hashPassword) => {
    const result = await bcrypt.compare(password, hashPassword)

    return result
}

module.exports = comparePassword