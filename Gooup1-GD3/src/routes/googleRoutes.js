//const express = require('express');
const router = require('express').Router();
//const userController = require('../controllers/userController');
//const passport = require('../config/passport');
const passport = require('../config/passportGoogle');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const authController = require('../controllers/authController');

// Route khởi tạo yêu cầu đăng nhập với Google
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  }),
);
// Route callback sau khi Google xác thực
router.get(
  '/google/callback',
  (req, res, next) => {
    passport.authenticate('google', async (err, profile) => {
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
    //Tạo JWT token
    const user = req.user;
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    );

    res.redirect(`${process.env.URL_CLIENT}/login-success/${token}`);
  },
);

router.post('/login-success', authController.loginSuccess);

module.exports = router;
