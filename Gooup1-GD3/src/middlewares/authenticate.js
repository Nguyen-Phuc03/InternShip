const jwt = require('jsonwebtoken');
require('dotenv').config();
//Xác minh token và lấy thông tin người dùng.
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    console.log('Authorization header:', authHeader); // Log tiêu đề Authorization

    const token = authHeader.split(' ')[1];
    console.log('Token:', token); // Log token

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.log('JWT verification error:', err); // Log lỗi JWT
        return res.sendStatus(403); // Token không hợp lệ hoặc đã hết hạn
      }
      req.user = user;
      next();
    });
  } else {
    console.log('No Authorization header found'); // Log khi không có tiêu đề Authorization
    res.sendStatus(401); // Không có tiêu đề Authorization
  }
};
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: 'Bạn không có quyền truy cập tài nguyên này' });
    }
    next();
  };
};

module.exports = {
  authenticateJWT,
  authorizeRoles,
};
