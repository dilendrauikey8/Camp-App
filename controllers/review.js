const Camp = require('../models/camp');
const Review = require('../models/review');

module.exports.createCampReview = async (req, res) => {

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


}

module.exports.deleteCampReview = async (req, res) => {

   const { id, reviewId } = req.params;
   await Camp.findByIdAndUpdate(id, { $pull: { review: reviewId } });
   await Review.findByIdAndDelete(reviewId);
   req.flash('success', 'review successfully deleted')
   res.redirect(`/makecamp/${id}`);


}