const nodemailer = require('nodemailer');

module.exports = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOSt,
            service: process.env.SERVICE,
            port: Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.SECURE),
            auth: {
                type: "XOAuth2",
                user: process.env.USER,
                pass: process.env.PASS
            }
        });
        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text
        });
        console.log("email sent Successfully");
    }
    catch (err) {
        console.log("email not sent");
        console.log(err);
    }
}