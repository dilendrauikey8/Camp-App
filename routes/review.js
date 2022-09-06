const express = require('express');
const router = express.Router({ mergeParams: true });
const Camp = require('../models/camp');
const Review = require('../models/review');
const { CampSchema, ReviewSchema } = require('../schemas.js');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');

router.post('/', isLoggedIn, validateReview, catchAsync(async (req, res) => {

   const { id } = req.params;
   const camp = await Camp.findById(id);
   const review1 = req.body;
   const newReview = new Review(review1);
   newReview.author = req.user._id;
   camp.review.push(newReview);
   await newReview.save();
   await camp.save();
   req.flash('success', 'Created new review!');
   res.redirect(`/makecamp/${id}`);


}));
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(async (req, res) => {

   const { id, reviewId } = req.params;
   await Camp.findByIdAndUpdate(id, { $pull: { review: reviewId } });
   await Review.findByIdAndDelete(reviewId);
   req.flash('success', 'review successfully deleted')
   res.redirect(`/makecamp/${id}`);


}));

module.exports = router;