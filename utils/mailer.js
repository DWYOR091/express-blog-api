const nodemailer = require('nodemailer')
const { emailUser, emailPassword } = require('../config/kyes')

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: emailUser,
        pass: emailPassword
    }
})

const sendEmail = async (to, subject, code, content) => {
    try {
        const mailOptions = {
            from: emailUser,
            to: to,
            subject: subject,
            html: `
            <h2>Use this bellow code to ${content}:<h2>
            <p>${code}<p>`
        }

        const info = await transporter.sendMail(mailOptions)
        return info
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = sendEmail