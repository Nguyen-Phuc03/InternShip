const mysql = require('mysql2');
// Cấu hình cơ sở dữ liệu MySQL
const dbMysqlWorkbench = {
  host: 'localhost',
  user: 'root',
  password: '27052003',
  database: 'hotel_booking_system',
};

// Hàm để xử lý kết nối cơ sở dữ liệu với retry
let connection;
const connectWithRetry = () => {
  connection = mysql.createConnection(dbMysqlWorkbench);

  connection.connect((err) => {
    if (err) {
      console.error('Lỗi kết nối MySQL:', err);
      // Thử kết nối lại sau 5 giây
      setTimeout(connectWithRetry, 5000);
    } else {
      //console.log('Đã kết nối MySQL');
    }
  });

  connection.on('error', (err) => {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      // Kết nối lại khi mất kết nối
      connectWithRetry();
    } else {
      throw err;
    }
  });
};

connectWithRetry();
module.exports = connection;
