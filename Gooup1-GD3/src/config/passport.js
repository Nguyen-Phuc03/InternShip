// passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const userService = require('../services/userService');
// Cấu hình LocalStrategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email', // Trường email sẽ được sử dụng thay vì username mặc định
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        // Tìm người dùng theo email
        const user = await userService.getUserByName(email);
        if (!user) {
          return done(null, false, { message: 'Tên người dùng không tồn tại' });
        }

        // So sánh mật khẩu
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
          return done(null, false, { message: 'Sai mật khẩu' });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

// Serialize người dùng để lưu vào session
passport.serializeUser((user, done) => {
  done(null, user.id_users);
});

// Deserialize người dùng từ session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await userService.getUserByNameById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
