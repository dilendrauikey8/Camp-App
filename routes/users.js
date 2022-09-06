const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');

router.get('/register', (req, res) => {
   res.render('user/register');
});
router.post('/register', catchAsync(async (req, res,next) => {
   try {
      const { username, email, password } = req.body;
      const user = new User({ username, email });
      const registered = await User.register(user, password);
      req.login(registered, err => {
         if (err) return next(err);
         req.flash('success', 'Welcome to camp-tour page');
         res.redirect('/makecamp');
      })
   } catch (err) {
      req.flash('error', err.message);
      res.redirect('/register');
   }
}));

router.get('/login', (req, res) => {
   res.render('user/login');
});
router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login',keepSessionInfo: true }), (req, res) => {
   req.flash('success', 'welcome');

   const redUrl = req.session.returnTo || '/makecamp';
   delete req.session.returnTo;
   res.redirect(redUrl);
})
router.get('/logout', (req, res, next) => {
   req.logout((err) => {
      if (err) {
         return next(err);
      }
      req.flash('success', "logged-out successfully!");
      res.redirect('/makecamp');
   })

})
module.exports = router;