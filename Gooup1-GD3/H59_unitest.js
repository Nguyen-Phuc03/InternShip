const express = require('express');
const Router = require('./src/routes/userRoutes');
const bodyParser = require('body-parser');
const session = require('express-session');
const swaggerSetup = require('./src/config/swagger');
const passport = require('passport');
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

app.use('/auth', Router);
swaggerSetup(app);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Máy chủ đang lắng nghe tại http://localhost:${port}`);
});
