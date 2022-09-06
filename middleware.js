const ExpressError = require('./utils/ExpressError');
const Camp = require('./models/camp');
const { CampSchema, ReviewSchema } = require('./schemas.js');
const Review = require('./models/review');
module.exports.isLoggedIn = (req, res, next) => {
   if (!req.isAuthenticated()) {
      req.session.returnTo =  req.originalUrl;
      req.flash('error', 'must be signed in');
      return res.redirect('/login');
   }
   next();
};
module.exports.validateCamp = (req, res, next) => {
   const { error } = CampSchema.validate(req.body);
   // console.log(error);
   if (error) {
      const errs = error.details.map(el => el.message).join(',');
      throw new ExpressError(errs, 400);
   }
   else {
      next();
   }
}

module.exports.isAuthor = async (req, res, next) => {
   const { id } = req.params;
   const camp = await Camp.findById(id);
   if (!camp.author.equals(req.user._id)) {
      req.flash('error', 'You are not allowed to do that or permission denied');
      return res.redirect(`/makecamp/${id}`);
   }
   next();
}
module.exports.isReviewAuthor = async (req, res, next) => {
   const { id,reviewId } = req.params;
   const rev = await Review.findById(reviewId);
   if (!rev.author.equals(req.user._id)) {
      req.flash('error', 'You are not allowed to do that or permission denied');
      return res.redirect(`/makecamp/${id}`);
   }
   next();
}
module.exports.validateReview = (req, res, next) => {
   const { error } = ReviewSchema.validate(req.body);
   if (error) {
      const msg = error.details.map(el => el.message).join(',')
      throw new ExpressError(msg, 400)
   } else {
      next();
   }
}
