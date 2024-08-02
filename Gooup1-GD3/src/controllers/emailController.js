const { sendEmailService } = require('../services/emailService');

const sendEmailController = async (req, res) => {
  try {
    const { email, name } = req.body;
    if (email) {
      const response = await sendEmailService(email, name);
      return res.json(response);
    }
    return res.status(400).json({
      status: 'error',
      message: 'The email is required',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

module.exports = {
  sendEmailController,
};
