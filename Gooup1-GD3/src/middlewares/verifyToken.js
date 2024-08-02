const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to authenticate token' });
    }
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

const isSuperAdmin = (req, res, next) => {
  if (req.userRole === 'SuperAdmin') {
    next();
  } else {
    res.status(403).json({ message: 'Require SuperAdmin Role' });
  }
};

const isAdmin = (req, res, next) => {
  if (req.userRole === 'Admin' || req.userRole === 'SuperAdmin') {
    next();
  } else {
    res.status(403).json({ message: 'Require Admin Role' });
  }
};

const isUser = (req, res, next) => {
  if (
    req.userRole === 'User' ||
    req.userRole === 'Admin' ||
    req.userRole === 'SuperAdmin'
  ) {
    next();
  } else {
    res.status(403).json({ message: 'Require User Role' });
  }
};

module.exports = {
  verifyToken,
  isSuperAdmin,
  isAdmin,
  isUser,
};
