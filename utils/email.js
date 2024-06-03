const nodemailer = require('nodemailer');

async function sendEmail(to, subject, htmlContent) {
  const transporter = nodemailer.createTransport({
    // Configure your email sending service (e.g., SMTP)
  });

  const mailOptions = {
    from: '"Kryptonite App" <amoguuche042@gmail.com>',
    to: 'amaphytejr@gmail.com',
    subject,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = sendEmail;
