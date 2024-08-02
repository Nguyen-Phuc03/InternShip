const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');
require('dotenv').config();
//const router = require('express').Router();

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: '/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'emails'],
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        console.log(profile);

        // Lấy thông tin người dùng từ profile
        const userData = {
          id_users: profile.id,
          displayName: profile.displayName,
          email:
            profile.emails && profile.emails[0] && profile.emails[0].value
              ? profile.emails[0].value
              : null, // Kiểm tra email có tồn tại hay không
        };

        // Tìm hoặc tạo người dùng trong cơ sở dữ liệu
        let user = await userService.findOrCreateUser(userData);

        // Tạo JWT token
        const token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: '1h' },
        );

        // Đính kèm token vào người dùng để sử dụng sau này
        user.token = token;

        return cb(null, user);
      } catch (error) {
        return cb(error);
      }
    },
  ),
);
module.exports = passport;
