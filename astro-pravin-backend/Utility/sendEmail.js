const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  
  // Define email options
  const mailOptions = {
    from: 'Astro with Pravin <noreply@astrowithpravin.com>',
    to: options.to,
    subject: options.subject,
    html: options.html,
  };
  
  // Send email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;