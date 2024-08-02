const express = require('express');
const router = express.Router();
const upload = require('../config/uploadConfig');
//const path = require('path');
require('dotenv').config();

router.post('/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    return res.status(200).json({
      message: 'File uploaded successfully',
      filename: req.file.filename,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'File upload failed', error: err.message });
  }
});

// Route để lấy về một file đã upload

module.exports = router;
