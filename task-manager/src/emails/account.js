require('dotenv').config({path: process.env.NODEJS_COURSE_CONF_LOCATION})
const sendgridMail = require('@sendgrid/mail');

sendgridMail.setApiKey(process.env.TASKMANAGER_SENDGRID_API_KEY);

// This function returns a promise, so you could 'await' this...
const sendWelcomeEmail = (to, name) => {
    sendgridMail.send({
        to,
        from: process.env.EMAIL_FROM,
        subject: 'Thanks for joining!',
        text: `Welcome to the task manager app, ${name}.`,
        html: `<h1>Welcome</h1> <p>Welcome to the task manager app, ${name}.</p>`
    });
}

const sendGoodbyeEmail = (to, name) => {
    sendgridMail.send({
        to,
        from: process.env.EMAIL_FROM,
        subject: 'Goodbye!',
        text: `Hi ${name}, you have successfully unsubscribed from the task manager.`,
        html: `<h1>Hi ${name},</h1> <p>you have successfully unsubscribed from the task manager.</p>`
    });
}

module.exports = {
    sendWelcomeEmail,
    sendGoodbyeEmail
}