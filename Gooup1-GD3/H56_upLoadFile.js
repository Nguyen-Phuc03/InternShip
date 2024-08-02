const express = require('express');
const Router = require('./src/routes/userRoutes');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('./src/config/passport');
const swaggerSetup = require('./src/config/swagger');
const i18n = require('./src/config/language');
const path = require('path');
const uploadRoutes = require('./src/routes/upLoadFileRoutes');

require('dotenv').config();
const app = express();

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

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', uploadRoutes);
app.get('/upload/:filename', (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, 'public', filename);

  res.sendFile(filepath, (err) => {
    if (err) {
      return res.status(404).json({ message: 'File not found' });
    }
  });
});

swaggerSetup(app);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Máy chủ đang lắng nghe tại http://localhost:${port}`);
});
