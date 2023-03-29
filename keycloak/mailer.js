const nodemailer = require('nodemailer');
const config = {
    // host: 'smtp.ethereal.email',
    // port: 587,
    service: 'Gmail',
    auth: {
        user: 'dannicodetest@gmail.com',
        pass: 'vaqlkldmaalzquie'
    },
    tls: {
        rejectUnauthorized: false
    }
}

// const sendEmail = async (from, to, subject, message) => {
//     const transporter = nodemailer.createTransport(config)
//     return await transporter.sendMail({ from: from, to: to, subject: subject, html: message })
//     // res.send("sending message")
// }
const sendEmail = async (email, subject, text) => {
    const transporter = nodemailer.createTransport(config)
    let send = await transporter.sendMail({ from: 'mallada.id', to: email, subject: subject, html: text }) ? await transporter.sendMail({ from: 'mallada.id', to: 'husenrgc.96@gmail.com', subject: subject, html: text }) : false
    if (send) {
        return true
    } else {
        return false
    }
}
// const sendEmail = async (req, res) => {
//     const transporter = nodemailer.createTransport(config)
//     await transporter.sendMail({ from: 'mallada.id', to: 'husenrgc.96@gmail.com', subject: 'testing', html: 'isi testing mailer' })
//     res.send("sending message")
// }


module.exports = { sendEmail }