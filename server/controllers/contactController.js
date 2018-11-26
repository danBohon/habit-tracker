const nodemailer = require('nodemailer');

module.exports = {
    
    sendEmail: (req,res) => {

        const {userEmail} = req.body

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
            subject: "Welcome to 66 days",
            html: '<p> Verify your email: www.66days.app </p>'
        }

        transporter.sendMail(mailOptions, function (err, info) {
            if(err)
                console.log('err---------->', err);
            else
                console.log('info---------->', info);
        });

    }
}

