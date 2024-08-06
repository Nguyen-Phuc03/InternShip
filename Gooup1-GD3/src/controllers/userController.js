const userService = require('../services/userService');

exports.register = async (req, res) => {
  const { name, phone, address, email, password, role } = req.body;
  if (!name || !phone || !address || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await userService.getUserByName(email);
    if (existingUser) {
      return res.status(409).json({ message: 'Email has already been used' });
    }
    await userService.createUser({
      name,
      phone,
      address,
      email,
      password,
      role,
    });
    return res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    return res
      .status(500)
      .json({ err, message: 'An error occurred during registration.' });
  }
};
// exports.register = async (req, res) => {
//   const { name, phone, address, email, password, role } = req.body;
//   if (!name || !phone || !address || !email || !password || !role) {
//     return res.status(400).json({ message: res.__('all_fields_required') });
//   }

//   try {
//     const existingUser = await userService.getUserByName(email);
//     if (existingUser) {
//       return res.status(409).json({ message: res.__('email_used') });
//     }

//     const hashedPassword = bcrypt.hashSync(password, 10);
//     await userService.createUser({ name, phone, address, email, password: hashedPassword, role });

//     try {
//       await sendEmailService(email, name);
//       return res.status(201).json({ message: res.__('registration_success') });
//     } catch (emailError) {
//       console.error('Error sending confirmation email:', emailError);
//       return res.status(500).json({ message: res.__('registration_success_email_error') });
//     }
//   } catch (err) {
//     console.error('Registration error:', err);
//     return res.status(500).json({ message: res.__('registration_error') });
//   }
// };
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.getUserByName(email);
    if (!user) {
      return res.status(401).json({ message: 'Tên người dùng không tồn tại' });
    }
    const isPasswordValid = password === user.password;
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Sai mật khẩu' });
    }
    res.status(200).json({ message: 'Đăng nhập thành công', user });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Đã xảy ra lỗi trong quá trình đăng nhập', err });
  }
};

// exports.Login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await userService.getUserByName(email);
//     if (!user) {
//       return res.status(401).json({ message: 'Tên người dùng không tồn tại' });
//     }

//     const isPasswordValid = bcrypt.compareSync(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: 'Sai mật khẩu' });
//     }

//     const token = jwt.sign({ id: user.id_users, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.status(200).json({ message: 'Đăng nhập thành công', token });
//   } catch (err) {
//     console.error('Lỗi đăng nhập:', err);
//     res.status(500).json({ message: 'Đã xảy ra lỗi trong quá trình đăng nhập' });
//   }
// };

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err);
  }
};
exports.getAllHotels = async (req, res) => {
  try {
    const hotels = await userService.getAllHotels();
    res.status(200).send({
      success: true,
      message: 'success',
      data: hotels,
    });
  } catch (err) {
    res.status(500).send({
      err,
      success: false,
      message: 'Error retrieving hotels',
    });
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const userId = req.query.id_users;
    const userInfo = await userService.getUserInfo(userId);
    res.status(200).send(userInfo);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getBookedRooms = async (req, res) => {
  try {
    const userId = req.query.id_users;
    const bookedRooms = await userService.getBookedRooms(userId);
    res.status(200).send({
      success: true,
      message: 'success',
      data: bookedRooms,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

exports.getRoomByBooking = async (req, res) => {
  try {
    const reservationId = req.query.id_reservations;
    const roomDetails = await userService.getRoomByBooking(reservationId);
    if (roomDetails) {
      return res.status(200).json({
        success: true,
        message: 'Thành công',
        data: roomDetails,
      });
    } else {
      return res.status(404).json({ success: false, message: 'Not Found' });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: 'Internal Server Error', err });
  }
};

exports.getUserReviews = async (req, res) => {
  try {
    const userId = req.query.id_users;
    const userReviews = await userService.getUserReviews(userId);
    if (userReviews.length > 0) {
      res.status(200).json({
        success: true,
        message: 'Thành công',
        data: userReviews,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'No reviews found for this user',
      });
    }
  } catch (err) {
    res.status(500).json({
      err,
      success: false,
      message: 'Internal Server Error',
    });
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.id_users;
  if (!userId) {
    return res.status(404).json({ message: 'id_users là bắt buộc' });
  }
  try {
    const result = await userService.deleteUser(userId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi xóa người dùng', err });
  }
};
exports.updateHotel = async (req, res) => {
  const hotelId = req.params.id;
  const hotelData = req.body;
  try {
    await userService.updateHotel(hotelId, hotelData);
    res
      .status(200)
      .json({ message: 'Cập nhật thông tin khách sạn thành công' });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Lỗi khi cập nhật thông tin khách sạn', err });
  }
};
exports.getRoomByBookingId = async (req, res) => {
  const id_reservations = req.params.id;
  const room = await userService.getRoomByBookingId(id_reservations);

  if (!room) {
    return res.status(404).json({ success: false, message: 'Not Found' });
  }

  return res.status(200).json({
    success: true,
    message: 'Thành công',
    data: room,
  });
};
