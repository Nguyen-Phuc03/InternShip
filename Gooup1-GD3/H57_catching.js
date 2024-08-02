// 1. Các loại caching:
// In-Memory Caching: Lưu trữ dữ liệu trong bộ nhớ RAM, giúp truy xuất dữ liệu nhanh hơn so với đọc từ ổ đĩa.
// Ví dụ: Redis, Memcached.

// Disk Caching: Lưu trữ dữ liệu trên đĩa cứng để tránh truy cập nguồn gốc nhiều lần.
// Ví dụ: SSD Cache, Hibernation Cache.

// Database Caching: Tạo các bản sao dữ liệu tạm thời từ cơ sở dữ liệu để giảm tải truy vấn gốc.
// Ví dụ: Query Cache trong MySQL.

// Web Caching: Lưu trữ các trang web hoặc tài nguyên web để giảm tải cho máy chủ gốc.
// Ví dụ: Browser Cache, CDN.

// Object Caching: Lưu trữ các đối tượng đã được xử lý để sử dụng lại trong tương lai.
// Ví dụ: Application Cache.
// 2. Khi nào sử dụng caching:

// Tăng tốc độ truy cập dữ liệu: Khi cần truy xuất dữ liệu thường xuyên và nhanh chóng.
// Giảm tải cho hệ thống: Khi hệ thống gốc không thể xử lý quá nhiều yêu cầu cùng một lúc.
// Tăng hiệu suất: Khi muốn cải thiện hiệu suất của ứng dụng bằng cách giảm thời gian phản hồi.
// Lưu trữ tạm thời: Khi cần lưu trữ tạm thời các dữ liệu có thể tái tạo lại dễ dàng.
const express = require('express');
const Router = require('./src/routes/userRoutes');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('./src/config/passport');
const swaggerSetup = require('./src/config/swagger');

const cors = require('cors');

const i18n = require('./src/config/language');
const path = require('path');
const uploadRoutes = require('./src/routes/upLoadFileRoutes');
//  const redisClient = require('./src/config/redis');

require('dotenv').config();
const app = express();

const corsOptions = {
  origin: '*', // CHo phép truy cập tất cả các nguồn
  methods: 'GET,POST', // chỉ cho phép dùng các phương thức GET,POST
  allowedHeaders: ['Content-Type', 'Authorization'], //chỉ cho phép các Content-Typevà Authorization
};
app.use(cors(corsOptions));

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

app.use(i18n.init);

app.use('/auth', Router);
app.use(
  express.static(
    path.join(
      __dirname,

      'public',
    ),
  ),
);
app.use('/api', uploadRoutes);

swaggerSetup(app);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Máy chủ đang lắng nghe tại http://localhost:${port}`);
});
