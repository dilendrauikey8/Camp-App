const express = require('express');
const { rmSync, appendFileSync } = require('fs');
const mongoose = require('mongoose');
const Camp = require('./models/camp');// import from models
const path = require('path');
const engine = require('ejs-mate');
const { CampSchema, ReviewSchema } = require('./schemas.js');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const Review = require('./models/review');


const makecampRoutes = require('./routes/makecamp');
const reviewsRoutes = require('./routes/review');
const userRoutes = require('./routes/users');

const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const passportLocal = require('passport-local');
const User = require('./models/user');
mongoose.connect('mongodb://localhost:27017/campApp', { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => {
      console.log("connection open!!!");
   })
   .catch(err => {
      console.log("OH NO ERROR!!!!");
      console.log(err);
   });
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

const sessionConfig = {
   secret: 'thisshouldbeabettersecret!',
   resave: false,
   saveUninitialized: true,
   cookie: {
      httpOnly: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7
   }
}
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
   res.locals.currentUser = req.user;
   // console.log(req.user);
   res.locals.success = req.flash('success');
   res.locals.error = req.flash('error');
   next();
})
app.get('/', (req, res) => {
   res.render('home');
});

app.use('', userRoutes);
app.use('/makecamp', makecampRoutes);
app.use('/makecamp/:id/review', reviewsRoutes);

app.all('*', (req, res, next) => {
   // res.send("404!!");
   next(new ExpressError("page not found", 404));
})
app.use((err, req, res, next) => {
   const { statusCode = 500 } = err;
   if (!err.message) {
      err.message = "Something Went Wrong";
   }
   res.status(statusCode).render('errors', { err });
   // res.send("Something wrong");
})
app.listen(3000, () => {
   console.log('Server connected');
});