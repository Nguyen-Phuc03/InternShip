const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');
require('dotenv').config();
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        console.log(profile);
        // Lấy thông tin người dùng từ profile
        const userData = {
          id_users: profile.id,
          displayName: profile.displayName,
          email: profile.emails[0].value,
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
