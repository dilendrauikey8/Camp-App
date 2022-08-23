const express = require('express');
const router = express.Router({ mergeParams: true });
const Camp = require('../models/camp');
const Review = require('../models/review');
const { CampSchema, ReviewSchema } = require('../schemas.js');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

const validateReview = (req, res, next) => {
   const { error } = ReviewSchema.validate(req.body);
   if (error) {
      const msg = error.details.map(el => el.message).join(',')
      throw new ExpressError(msg, 400)
   } else {
      next();
   }
}

router.post('/', validateReview, catchAsync(async (req, res) => {

   const { id } = req.params;
   const camp = await Camp.findById(id);
   const review1 = req.body;
   const newReview = new Review(review1);
   camp.review.push(newReview);
   await newReview.save();
   await camp.save();
   req.flash('success', 'Created new review!');
   res.redirect(`/makecamp/${id}`);


}));
router.delete('/:reviewId', catchAsync(async (req, res) => {

   const { id, reviewId } = req.params;
   await Camp.findByIdAndUpdate(id, { $pull: { review: reviewId } });
   await Review.findByIdAndDelete(reviewId);
   req.flash('success', 'review successfully deleted')
   res.redirect(`/makecamp/${id}`);


}));

module.exports = router;