const express = require('express');
const router = express.Router();
const Camp = require('../models/camp');
const { CampSchema, ReviewSchema } = require('../schemas.js');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const { isLoggedIn, validateCamp, isAuthor } = require('../middleware');
const makecamp = require('../controllers/makecamp');

router.get('/', catchAsync(makecamp.campShow));
router.get('/new', isLoggedIn, makecamp.campNewGet);// to get for creat new form
router.post('/', isLoggedIn, validateCamp, catchAsync(makecamp.campNewPost));// post 
router.get('/:id', catchAsync(makecamp.campDetails));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(makecamp.campEditGet));
router.put('/:id', isLoggedIn, isAuthor, validateCamp, catchAsync(makecamp.campEditPost))
router.delete('/:id', isLoggedIn, isAuthor, catchAsync(makecamp.campDelete));

module.exports = router;