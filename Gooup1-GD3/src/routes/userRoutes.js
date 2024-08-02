const express = require('express');
const userController = require('../controllers/userController');
const {
  authenticateJWT,
  authorizeRoles,
} = require('../middlewares/authenticate');
const router = express.Router();
const passport = require('../config/passport');
const jwt = require('jsonwebtoken');
const { sendEmailController } = require('../controllers/emailController');
router.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    req.logIn(user, { session: false }, (err) => {
      if (err) {
        return next(err);
      }
      const token = jwt.sign(
        { id: user.id_users, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
      );
      return res.json({ message: 'Đăng nhập thành công', token });
    });
  })(req, res, next);
});
router.post('/register', userController.register);
router.get('/getAll', authenticateJWT, userController.getAllUsers);
//router.get('/getAllHotels', authenticateJWT, authorizeRoles('SuperAdmin'), userController.getAllHotels);
router.get('/getAllHotels', userController.getAllHotels);
//router.get('/getUserInfo', authenticateJWT, userController.getUserInfo);
router.get('/getBookedRooms', authenticateJWT, userController.getBookedRooms);
router.get(
  '/getRoomByBooking',
  authenticateJWT,
  userController.getRoomByBooking,
);
router.get('/getUserReviews', authenticateJWT, userController.getUserReviews);
router.get('/getRoomByBooking/:id', userController.getRoomByBookingId);

router.delete(
  '/deleteUser/:id_users',
  authenticateJWT,
  userController.deleteUser,
);
router.put('/updateHotel/:id', authenticateJWT, userController.updateHotel);

//router.post('/login', userController.login);
// router.post('/register', userController.register);
// router.get('/getAllUsers', userController.getAllUsers);
// router.get('/getAllHotels', userController.getAllHotels);
// router.get('/getUserInfo', userController.getUserInfo);
// router.get('/getBookedRooms/:userId', userController.getBookedRooms);
// router.get('/getRoomByBooking', userController.getRoomByBooking);
// router.get('/getUserReviews', userController.getUserReviews);
// router.delete('/deleteUser/:id_users', userController.deleteUser);
// router.put('/updateHotel/:id', userController.updateHotel);

router.get(
  '/protected',
  authenticateJWT,
  authorizeRoles('User', 'Admin', 'SuperAdmin'),
  (req, res) => {
    res.json({ message: 'truy cập được route', user: req.user });
  },
);
router.post('/sendEmail', sendEmailController);
// router.post('/register', userController.register);
// router.get('/getAll', authenticateJWT, authorizeRoles('Admin', 'SuperAdmin'), userController.getAllUsers);
// //router.get('/getAllHotels', authenticateJWT, authorizeRoles('SuperAdmin'), userController.getAllHotels);
// router.get('/getAllHotels', userController.getAllHotels);
// router.get('/getUserInfo', authenticateJWT, userController.getUserInfo);
// router.get('/getBookedRooms', authenticateJWT, userController.getBookedRooms);
// router.get('/getRoomByBooking', authenticateJWT, userController.getRoomByBooking);
// router.get('/getUserReviews', authenticateJWT, userController.getUserReviews);

// router.delete('/deleteUser/:id_users', authenticateJWT, authorizeRoles('SuperAdmin'), userController.deleteUser);
// router.put('/updateHotel/:id', authenticateJWT, authorizeRoles('Admin', 'SuperAdmin'), userController.updateHotel);

module.exports = router;
