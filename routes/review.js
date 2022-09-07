const express = require('express');
const router = express.Router({ mergeParams: true });
const Camp = require('../models/camp');
const Review = require('../models/review');
const { CampSchema, ReviewSchema } = require('../schemas.js');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const campReview = require('../controllers/review');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');

router.post('/', isLoggedIn, validateReview, catchAsync(campReview.createCampReview));
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(campReview.deleteCampReview));

module.exports = router;