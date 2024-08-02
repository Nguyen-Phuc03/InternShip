// uploadConfig.js
const multer = require('multer');
const path = require('path');

// Cấu hình storage cho multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/'); // Thư mục lưu trữ file upload
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const originalName = file.originalname;
    const ext = path.extname(originalName);
    const name = path.basename(originalName, ext);
    const newFilename = `${timestamp}__${name}${ext}`;
    cb(null, newFilename);
  },
});

// Khởi tạo upload middleware với cấu hình storage
const upload = multer({ storage: storage });

module.exports = upload;
