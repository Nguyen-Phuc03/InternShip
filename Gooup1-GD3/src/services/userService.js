const connection = require('../models/dbMySQL');
//const redisClient = require('../config/redis');

const findOrCreateUser = async (userData) => {
  return new Promise((resolve, reject) => {
    const { googleId, displayName, email } = userData;

    // Kiểm tra xem người dùng đã tồn tại chưa
    connection.query(
      'SELECT * FROM users WHERE id_users = ?',
      [googleId],
      (err, results) => {
        if (err) {
          return reject(err);
        }

        if (results.length > 0) {
          // Người dùng đã tồn tại, trả về thông tin người dùng
          return resolve(results[0]);
        } else {
          // Người dùng chưa tồn tại, tạo người dùng mới
          const newUser = {
            id_users: googleId,
            name: displayName,
            email: email,
          };

          connection.query(
            'INSERT INTO users SET ?',
            newUser,
            (err, result) => {
              if (err) {
                return reject(err);
              }

              newUser.id = result.insertId; // Lấy ID của người dùng mới tạo
              resolve(newUser);
            },
          );
        }
      },
    );
  });
};

const getUserById = async (id) => {
  try {
    const [rows] = await connection
      .promise()
      .execute('SELECT * FROM users WHERE id_users = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Lỗi khi tìm người dùng theo ID:', error);
    throw error;
  }
};

const getUserByName = async (email) => {
  try {
    const [rows] = await connection
      .promise()
      .execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0]; // Trả về người dùng đầu tiên tìm thấy (nếu có)
  } catch (error) {
    console.error('Lỗi khi tìm người dùng theo email:', error);
    throw error;
  }
};
const createUser = async (user) => {
  try {
    const { name, phone, address, email, password, role } = user;

    // Kiểm tra xem các trường có hợp lệ không
    if (!name || !phone || !address || !email || !password || !role) {
      throw new Error('Một hoặc nhiều tham số không hợp lệ');
    }

    // Chèn người dùng vào cơ sở dữ liệu
    await connection
      .promise()
      .execute(
        'INSERT INTO users (name, phone, address, email, password, role) VALUES (?, ?, ?, ?, ?, ?)',
        [name, phone, address, email, password, role],
      );
  } catch (error) {
    console.error('Lỗi khi tạo người dùng:', error);
    throw error;
  }
};

// const createUser = async (user) => {
//   try {
//     const { name, phone, address, email, password, role } = user;
//     if (!name || !phone || !address || !email || !password || !role) {
//       throw new Error('Một hoặc nhiều tham số không hợp lệ');
//     }

//     await connection.promise().execute(
//       'INSERT INTO users (name, phone, address, email, password, role) VALUES (?, ?, ?, ?, ?, ?)',
//       [name, phone, address, email, password, role]
//     );
//   } catch (error) {
//     console.error('Lỗi khi tạo người dùng:', error);
//     throw error;
//   }
// };

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM users', (err, results) => {
      if (err) {
        return reject(err);
      }
      const transformed = results.map((user) => ({
        id_users: user.id_users,
        name: user.name.toUpperCase(),
        phone: user.phone,
        email: user.email,
        address: user.address,
      }));
      resolve(transformed);
    });
  });
};
const getAllHotels = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM hotels', (err, results) => {
      if (err) {
        return reject(err);
      }
      const transformed = results.map((hotel) => ({
        id_hotels: hotel.id_hotels,
        name: hotel.name.toUpperCase(),
        address: hotel.address,
        id_users: hotel.id_users,
      }));
      resolve(transformed);
    });
  });
};

// const getAllHotels = async () => {
//   try {
//     console.log('Checking Redis for all_hotels...');
//     const data = await redisClient.get('all_hotels');

//     if (data) {
//       console.log('Data retrieved from Redis cache');
//       return JSON.parse(data);
//     } else {
//       console.log('No data in cache, querying database...');
//       const results = await new Promise((resolve, reject) => {
//         connection.query('SELECT * FROM hotels', (err, results) => {
//           if (err) {
//             console.error('Database query error:', err);
//             return reject(err);
//           }
//           resolve(results);
//         });
//       });

//       const transformed = results.map(hotel => ({
//         id_hotels: hotel.id_hotels,
//         name: hotel.name.toUpperCase(),
//         address: hotel.address,
//         id_users: hotel.id_users,
//       }));

//       await redisClient.setEx('all_hotels', 3600, JSON.stringify(transformed));
//       console.log('Data cached in Redis');
//       return transformed;
//     }
//   } catch (error) {
//     console.error('Error in getAllHotels:', error);
//     throw error; // Ném lỗi ra ngoài để xử lý ở nơi khác
//   }
// };

const getUserInfo = (userId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT name, phone, address, email FROM users WHERE id_users = ?',
      [userId],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results[0]);
      },
    );
  });
};

const getBookedRooms = (userId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT r.name, r.type, r.status, r.price, r.floor
       FROM rooms AS r
       LEFT JOIN reservations AS re ON r.id_rooms = re.id_rooms
       WHERE re.id_users = ?
       ORDER BY re.reservation_date DESC
       LIMIT 10 OFFSET 0`,
      [userId],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      },
    );
  });
};

const getRoomByBooking = (reservationId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT r.name, r.type, r.status, r.price, r.floor
       FROM rooms AS r
       JOIN reservations AS re ON r.id_rooms = re.id_rooms
       WHERE re.id_reservations = ?`,
      [reservationId],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results[0]);
      },
    );
  });
};

const getUserReviews = (userId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT h.name, h.address, e.feedback, e.star
       FROM hotels AS h
       JOIN evaluates AS e ON h.id_hotels = e.id_hotels
       WHERE e.id_users = ?`,
      [userId],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      },
    );
  });
};

const deleteHotel = async (idhotel) => {
  if (!idhotel) {
    throw new Error('idhotel là bắt buộc');
  }
  try {
    const [results] = await connection.execute(
      'UPDATE hotels SET `delete` = true WHERE idhotel = ?',
      [idhotel],
    );
    if (results.affectedRows === 0) {
      throw new Error('Khách sạn không tồn tại');
    }
    return { message: 'Khách sạn đã được xóa thành công' };
  } catch (error) {
    console.error('Lỗi khi xóa khách sạn:', error);
    throw error;
  }
};

const createRoom = async (room) => {
  try {
    const { name, floor, type, area, price, status, idhotel } = room;
    if (!name || !floor || !type || !area || !price || !status || !idhotel) {
      throw new Error('Một hoặc nhiều tham số không hợp lệ');
    }

    const [result] = await connection
      .promise()
      .execute(
        'INSERT INTO rooms (name, floor, type, area, price, status, idhotel) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, floor, type, area, price, status, idhotel],
      );

    return result;
  } catch (error) {
    console.error('Lỗi khi tạo phòng:', error);
    throw error;
  }
};

const deleteUser = async (userId) => {
  if (userId == null) {
    throw new Error('id_users là bắt buộc');
  }
  try {
    const [results] = await connection
      .promise()
      .execute('DELETE FROM users WHERE id_users = ?', [userId]);
    if (results.affectedRows === 0) {
      throw new Error('Người dùng không tồn tại');
    }
    return { message: 'Người dùng đã được xóa thành công' };
  } catch (error) {
    console.error('Lỗi khi xóa người dùng:', error);
    throw error;
  }
};

const updateHotel = async (hotelId, hotelData) => {
  try {
    const columns = Object.keys(hotelData)
      .map((key) => `${key} = ?`)
      .join(', ');
    const values = Object.values(hotelData);

    await connection
      .promise()
      .execute(`UPDATE hotels SET ${columns} WHERE id_hotels = ?`, [
        ...values,
        hotelId,
      ]);
  } catch (error) {
    console.error('Lỗi khi cập nhật khách sạn:', error);
    throw error;
  }
};

module.exports = {
  findOrCreateUser,
  getUserById,
  getUserByName,
  createUser,
  getAllUsers,
  getUserInfo,
  getBookedRooms,
  getRoomByBooking,
  getUserReviews,
  deleteHotel,
  deleteUser,
  updateHotel,
  getAllHotels,
  createRoom,
};
