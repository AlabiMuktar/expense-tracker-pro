const nodemailer = require('nodemailer')

const emailManager = (email, text, html, subject) => {
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "df81b82606bbb7",
      pass: "7fb7fba1509695",
    },
  });

  transport.sendMail({
    to: email,
    from: "info@google.com",
    text: text,
    html: html,
    subject: subject,
  });
};

module.exports = emailManager;
