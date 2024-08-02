const router = require('express').Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const passport = require('../config/passportFacebook');
const authController = require('../controllers/authController');

//xác thực với Facebook
router.get('/facebook', passport.authenticate('facebook', { session: false }));
//Xử lý callback từ Facebook sau khi xác thực thành công
router.get(
  '/facebook/callback',
  (req, res, next) => {
    passport.authenticate('facebook', async (err, profile) => {
      if (err) {
        return next(err);
      }

      if (!profile) {
        return res.redirect(`${process.env.URL_CLIENT}/login-failure`);
      }

      req.user = profile;
      next();
    })(req, res, next);
  },
  async (req, res) => {
    const user = req.user;
    const token = jwt.sign(
      { id: user.id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    );

    res.redirect(`${process.env.URL_CLIENT}/login-success/${token}`);
  },
);

router.post('/login-success', authController.loginSuccess);

module.exports = router;
