const createHttpError = require('http-errors');
const nodemailer = require("nodemailer");
const sendMail = (mailInfo) => {

    try {
        const {receiver,emailSubject,template}=mailInfo
        const transporter= nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.APP_PASSWORD
            }
        });
        const mailOptions = {
            from: process.env.USER_EMAI, // sender address
            to: receiver.join(","), // list of receivers
            subject: emailSubject, // Subject line
            html: template// plain text body
        };

        return transporter.sendMail(mailOptions)

    } catch (err) {
        createHttpError(500, "Internal server error!")
    }
}

module.exports = sendMail
