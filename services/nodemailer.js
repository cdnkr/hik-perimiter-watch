const nodemailer = require('nodemailer');
const { format } = require('date-fns');

const transporter = configureTransporter();

const emails = require("../emails.json");

// Configure nodemailer transporter
function configureTransporter() {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAILJS_USER,
            pass: process.env.EMAILJS_PASSWORD
        }
    });
}

// Send email notification
function sendEmail(email, name, req, captureUrl) {
    transporter.sendMail({
        from: process.env.EMAILJS_USER,
        to: email,
        subject: `${req.body.class} detected`,
        text: `Hi ${name}, a ${req.body.class} has been detected with ${req.body.probability.toFixed(2) * 100}% probability - on camera ${req.params.camera} at ${format(new Date(), 'yyyy-MM-dd HH:mm')}. View capture: ${captureUrl}`
    }, (error, info) => error ? console.error(error) : console.log('Email sent: ' + info.response));
}

// Send email template to all emails loaded in emails.json
function sendEmails(req, captureUrl) {
    emails.forEach(({ email, name }) => sendEmail(email, name, req, captureUrl));
}

module.exports = {
    sendEmails
}