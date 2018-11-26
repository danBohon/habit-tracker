const nodemailer = require('nodemailer');

module.exports = {
    
    sendEmail: (req,res) => {

        const {userEmail, message, subject} = req.body

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASS
            }
        })

        const mailOptions = {
            from: process.env.NODEMAILER_EMAIL,
            to: userEmail,
            subject: subject,
            html: message
        }

        transporter.sendMail(mailOptions, function (err, info) {
            if(err)
                console.log('err---------->', err);
            else
                console.log('info---------->', info);
        });

    }
}

