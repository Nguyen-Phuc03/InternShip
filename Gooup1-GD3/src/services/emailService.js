const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmailService = async (email, name) => {
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    logger: true,
    debug: true,
  });

  try {
    let info = await transporter.sendMail({
      from: '"Gooup1"<nphuc305072@gmail.com>', // Thay bằng email của bạn
      to: email,
      subject: 'Chào mừng đến với Gooup1',
      text: `Xin chào ${name},\n\nCảm ơn bạn đã đăng ký. Chào mừng bạn đến với Gooup1.\n\nTrân trọng,\nGooup1`,
      html: `<p>Xin chào <b>${name}</b>,</p>
               <p>Cảm ơn bạn đã đăng ký. Chào mừng bạn đến với Gooup1.</p>
               <p>Trân trọng,</p>
               <p>Gooup1</p>`,
    });
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = {
  sendEmailService,
};
