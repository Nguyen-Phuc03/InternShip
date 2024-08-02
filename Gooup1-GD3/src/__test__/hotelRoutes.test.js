const supertest = require('supertest');
const express = require('express');
//const userController = require('../controllers/userController');
const app = express();
const user = require('../routes/userRoutes');
const userService = require('../services/userService');
app.use(express.json());
jest.useRealTimers();
app.use('/users', user);
jest.mock('../services/userService');

describe('Test /getUserInfo', () => {
  it('get data user by id success', async () => {
    const userId = 10;
    const mockUserInfo = {
      id: userId,
      name: 'Phuc',
      success: true,
      message: 'Thành công',
    };
    userService.getUserInfo.mockResolvedValue(mockUserInfo);

    const response = await supertest(app).get(
      `/users/getUserInfo?id_users=${userId}`,
    );
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toEqual('Thành công');
  });

  it('get data user by id Not found', async () => {
    const userId = 50;
    const mockError = { success: false, message: 'No found' };
    userService.getUserInfo.mockRejectedValue(mockError);

    const response = await supertest(app).get(
      `/users/getUserInfo?id_users=${userId}`,
    );
    expect(response.status).toBe(500);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toEqual('No found');
  });
});

describe('Test /users/getAllUsers', () => {
  it('get all users success', async () => {
    const mockUsers = { success: true, message: 'success' };
    userService.getAllUsers.mockResolvedValue(mockUsers);

    const response = await supertest(app).get('/users/getAllUsers');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUsers);
  });

  it('get all users fail', async () => {
    const mockError = { success: false, message: 'No found' };
    userService.getAllUsers.mockRejectedValue(mockError);

    const response = await supertest(app).get('/users/getAllUsers');
    expect(response.status).toBe(500);
    expect(response.body).toEqual(mockError);
  });
});

describe('Test /users/getAllHotels', () => {
  it('get all hotels success', async () => {
    const mockHotels = {
      success: true,
      message: 'success',
      data: [{ id: 1, name: 'Hotel A', address: '123 Đường XYZ', id_users: 3 }],
    };
    userService.getAllHotels.mockResolvedValue(mockHotels.data);

    const response = await supertest(app).get('/users/getAllHotels');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockHotels);
  });

  it('get all hotels fail', async () => {
    const mockError = {
      success: false,
      message: 'Error retrieving hotels',
    };
    userService.getAllHotels.mockRejectedValue(
      new Error('Error retrieving hotels'),
    );

    const response = await supertest(app).get('/users/getAllHotels');
    expect(response.status).toBe(500);
    expect(response.body).toEqual(mockError);
  });
});

describe('Test /users/getBookedRooms/:userId', () => {
  it('get booked rooms success', async () => {
    const userId = 1;
    const mockRooms = [
      {
        name: 'Room A',
        type: 'Single',
        status: 'booked',
        price: 100,
        floor: 1,
      },
      { name: 'Room B', type: 'Double', status: 'booked', price: 80, floor: 2 },
    ];
    userService.getBookedRooms.mockResolvedValue(mockRooms);

    const response = await supertest(app).get(
      `/users/getBookedRooms/${userId}`,
    );
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: 'success',
      data: mockRooms,
    });
  });

  it('get booked rooms fail', async () => {
    const userId = 1;
    const mockError = new Error('Error retrieving booked rooms');
    userService.getBookedRooms.mockRejectedValue(mockError);

    const response = await supertest(app).get(
      `/users/getBookedRooms/${userId}`,
    );
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      success: false,
      message: mockError.message,
    });
  });
});

describe('Test /users/getRoomByBooking', () => {
  it('get room by booking success', async () => {
    const reservationId = 1;
    const mockRoomDetails = {
      name: 'Room A',
      type: 'Single',
      status: '1',
      price: 100,
      floor: 1,
    };
    userService.getRoomByBooking.mockResolvedValue(mockRoomDetails);

    const response = await supertest(app).get(
      `/users/getRoomByBooking?id_reservations=${reservationId}`,
    );
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: 'Thành công',
      data: mockRoomDetails,
    });
  });

  it('get room by booking not found', async () => {
    const reservationId = 120;
    userService.getRoomByBooking.mockResolvedValue(null);

    const response = await supertest(app).get(
      `/users/getRoomByBooking?id_reservations=${reservationId}`,
    );
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: 'Not Found',
    });
  });

  it('get room by booking internal server error', async () => {
    const reservationId = 120;
    const mockError = new Error('Database query error');
    userService.getRoomByBooking.mockRejectedValue(mockError);

    const response = await supertest(app).get(
      `/users/getRoomByBooking?id_reservations=${reservationId}`,
    );
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      success: false,
      message: 'Internal Server Error',
    });
  });
});

describe('Test /users/getUserReviews', () => {
  it('get user reviews success', async () => {
    const userId = 1;
    const mockReviews = [
      {
        name: 'Hotel A',
        address: '123 Main St',
        feedback: 'Great place',
        star: 5,
      },
      { name: 'Hotel B', address: '456 Elm St', feedback: 'Not bad', star: 3 },
    ];
    userService.getUserReviews.mockResolvedValue(mockReviews);

    const response = await supertest(app).get(
      `/users/getUserReviews?id_users=${userId}`,
    );
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: 'Thành công',
      data: mockReviews,
    });
  });

  it('get user reviews not found', async () => {
    const userId = 1;
    userService.getUserReviews.mockResolvedValue([]);

    const response = await supertest(app).get(
      `/users/getUserReviews?id_users=${userId}`,
    );
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: 'No reviews found for this user',
    });
  });

  it('get user reviews internal server error', async () => {
    const userId = 1;
    const mockError = new Error('Database query error');
    userService.getUserReviews.mockRejectedValue(mockError);

    const response = await supertest(app).get(
      `/users/getUserReviews?id_users=${userId}`,
    );
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      success: false,
      message: 'Internal Server Error',
    });
  });
});

describe('Test /users/deleteUser/:id_users', () => {
  it('delete user success', async () => {
    const userId = 1;
    const mockResult = { message: 'Người dùng đã được xóa thành công' };
    userService.deleteUser.mockResolvedValue(mockResult);

    const response = await supertest(app).delete(`/users/deleteUser/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResult);
  });

  it('delete user not found', async () => {
    const userId = 1;
    const mockError = new Error('Người dùng không tồn tại');
    userService.deleteUser.mockRejectedValue(mockError);

    const response = await supertest(app).delete(`/users/deleteUser/${userId}`);
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Lỗi khi xóa người dùng' });
  });

  it('delete user invalid id_users', async () => {
    const response = await supertest(app).delete(`/users/deleteUser/`);
    expect(response.status).toBe(404);
  });

  it('delete user internal server error', async () => {
    const userId = 1;
    const mockError = new Error('Lỗi khi xóa người dùng');
    userService.deleteUser.mockRejectedValue(mockError);

    const response = await supertest(app).delete(`/users/deleteUser/${userId}`);
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Lỗi khi xóa người dùng' });
  });
});

describe('Test /users/updateHotel/:id', () => {
  it('update hotel success', async () => {
    const hotelId = 1;
    const hotelData = { name: 'Khách sạn D', address: '321 Đường XYZ' };
    userService.updateHotel.mockResolvedValue();

    const response = await supertest(app)
      .put(`/users/updateHotel/${hotelId}`)
      .send(hotelData);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'Cập nhật thông tin khách sạn thành công',
    });
  });

  it('update hotel internal server error', async () => {
    const hotelId = 1;
    const hotelData = { name: 'Khách sạn D', address: '321 Đường XYZ' };
    const mockError = new Error('Lỗi khi cập nhật thông tin khách sạn');
    userService.updateHotel.mockRejectedValue(mockError);

    const response = await supertest(app)
      .put(`/users/updateHotel/${hotelId}`)
      .send(hotelData);
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: 'Lỗi khi cập nhật thông tin khách sạn',
    });
  });
});

describe('POST /users/login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should return 200 if login is successful', async () => {
    const password = '1';
    const mockUser = {
      id_users: 1,
      email: 'phuc@example.com',
      password: password,
      role: 'user',
    };
    userService.getUserByName.mockResolvedValue(mockUser);

    const res = await supertest(app)
      .post('/users/login')
      .send({ email: 'phuc@example.com', password });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Đăng nhập thành công');
    expect(res.body.user).toEqual(
      expect.objectContaining({ email: 'phuc@example.com', role: 'user' }),
    );
  });
  it('should return 401 if user does not exist', async () => {
    userService.getUserByName.mockResolvedValue(null);

    const res = await supertest(app)
      .post('/users/login')
      .send({ email: 'phuc@example.com', password: '123' });

    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual('Tên người dùng không tồn tại');
  });

  it('should return 401 if password is incorrect', async () => {
    const mockUser = { email: 'phuc@example.com', password: '1234' };
    userService.getUserByName.mockResolvedValue(mockUser);

    const res = await supertest(app)
      .post('/users/login')
      .send({ email: 'phuc@example.com', password: '123' });

    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual('Sai mật khẩu');
  });

  it('should return 500 if there is an error during login process', async () => {
    userService.getUserByName.mockRejectedValue(new Error('DB error'));

    const res = await supertest(app)
      .post('/users/login')
      .send({ email: 'phuc@example.com', password: '123' });

    expect(res.statusCode).toEqual(500);
    expect(res.body.message).toEqual('Đã xảy ra lỗi trong quá trình đăng nhập');
  });
});

describe('Test /users/register', () => {
  it('should return 400 if any field is missing', async () => {
    const response = await supertest(app)
      .post('/users/register')
      .send({ name: 'Phuc' });
    expect(response.status).toBe(400);
  });

  it('should return 409 if user already exists', async () => {
    userService.getUserByName.mockResolvedValue({
      id: 1,
      email: 'john@example.com',
    });

    const response = await supertest(app).post('/users/register').send({
      name: 'Phuce',
      phone: '1234567890',
      address: '123 Main St',
      email: 'Phuc@example.com',
      password: '123',
      role: 'user',
    });

    expect(response.status).toBe(409);
  });

  it('should return 201 if registration is successful', async () => {
    userService.getUserByName.mockResolvedValue(null);
    userService.createUser.mockResolvedValue({});

    const response = await supertest(app).post('/users/register').send({
      name: 'Phuc',
      phone: '1234567890',
      address: '123 Main St',
      email: 'Phuc@example.com',
      password: '123',
      role: 'user',
    });

    expect(response.status).toBe(201);
  });

  it('should return 500 if registration fails', async () => {
    userService.getUserByName.mockResolvedValue(null);
    userService.createUser.mockRejectedValue(new Error());

    const response = await supertest(app).post('/users/register').send({
      name: 'Phuc',
      phone: '1234567890',
      address: '123 Main St',
      email: 'Phuc@example.com',
      password: '123',
      role: 'user',
    });

    expect(response.status).toBe(500);
  });
});
