const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const campUser = require('../controllers/users');

router.get('/register', campUser.createUser);
router.post('/register', catchAsync(campUser.registerUser));

router.get('/login', campUser.createLogin);
router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login', keepSessionInfo: true }), campUser.postUser)
router.get('/logout', campUser.userLogout);
module.exports = router;