const verifyToken = require('./authenticate');

exports.permission = (roles) => {
  return async (req, res, next) => {
    try {
      verifyToken(req, res, () => {
        const decoded = req.user;
        if (!roles.includes(decoded.user.role)) {
          return res.status(400).json({ message: 'Bạn không có permission' });
        }
        next();
      });
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
};
