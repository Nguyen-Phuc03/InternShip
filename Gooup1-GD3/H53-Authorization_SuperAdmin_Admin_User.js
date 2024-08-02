// RBAC là một phương pháp quản lý quyền truy cập dựa trên vai trò của người dùng trong hệ thống.
// Mỗi người dùng được gán một hoặc nhiều vai trò, và mỗi vai trò có các quyền hạn nhất định.
// Quyền hạn này xác định những gì người dùng có thể làm trong hệ thống.

// Lý do chọn mô hình RBAC
// Dễ quản lý: Mô hình RBAC giúp đơn giản hóa việc quản lý quyền truy cập. Chỉ cần gán vai trò cho người dùng, thay vì quản lý
//  quyền truy cập từng hành động riêng lẻ.
// Tính linh hoạt: RBAC cho phép dễ dàng thêm mới hoặc thay đổi vai trò và quyền hạn mà không cần thay đổi logic chính của ứng dụng.
// Tính mở rộng: Khi hệ thống phát triển, có thể dễ dàng thêm mới các vai trò và quyền hạn mà không ảnh hưởng đến cấu trúc hiện tại.
// Bảo mật: RBAC cung cấp cơ chế kiểm soát chặt chẽ quyền truy cập, đảm bảo rằng chỉ những người dùng có vai trò
// phù hợp mới có thể thực hiện các hành động cụ thể.
// Phù hợp với yêu cầu: RBAC phù hợp với yêu cầu của hệ thống đặt phòng khách sạn với các vai trò rõ ràng như
// SuperAdmin, Admin, và User, mỗi vai trò có quyền hạn khác nhau.

const express = require('express');
const Router = require('./src/routes/userRoutes');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('./src/config/passport'); // Thêm dòng này
const swaggerSetup = require('./src/config/swagger');

const app = express();

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', Router);
swaggerSetup(app);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Máy chủ đang lắng nghe tại http://localhost:${port}`);
});
