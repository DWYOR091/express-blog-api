const nodemailer = require('nodemailer')
const { emailUser, emailPassword } = require('../config/kyes')

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: emailUser,
        pass: emailPassword
    }
})

const sendEmail = async (to, subject, text, html) => {
    try {
        const mailOptions = {
            from: emailUser,
            to: to,
            subject: subject,
            text: text,
            html: html
        }

        const info = await transporter.sendMail(mailOptions)
        return info
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = sendEmail