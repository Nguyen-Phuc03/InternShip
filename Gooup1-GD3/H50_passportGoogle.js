const express = require('express');
//const Router=require('./src/routes/userRoutes')
const Router = require('./src/routes/googleRoutes');
const bodyParser = require('body-parser');
const session = require('express-session');
// const passport = require('./src/config/passport'); // Thêm dòng này
const swaggerSetup = require('./src/config/swagger');
const passport = require('./src/config/passportGoogle');

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
