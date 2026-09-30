const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'mail.sathread.com.bd',
    port: 465,
    secure: true,
    auth: {
        user: 'info@sathread.com.bd',
        pass: 'Volume!@#$0'
    }
});

transporter.sendMail({
    from: '"SA Thread Test" <info@sathread.com.bd>',
    to: 'info@sathread.com.bd', // sending to self to test
    subject: "Test Email from Next.js",
    text: "If you receive this, the SMTP is working!"
}, (err, info) => {
    if (err) {
        console.error("Error sending email:");
        console.error(err);
    } else {
        console.log("Email sent successfully: " + info.messageId);
    }
});
