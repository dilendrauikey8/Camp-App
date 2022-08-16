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

const validateCamp = (req, res, next) => {
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
const validateReview = (req, res, next) => {
   const { error } = ReviewSchema.validate(req.body);
   if (error) {
      const msg = error.details.map(el => el.message).join(',')
      throw new ExpressError(msg, 400)
   } else {
      next();
   }
}
app.get('/', (req, res) => {
   res.render('home');
});
app.get('/makecamp', catchAsync(async (req, res) => {
   const camp = await Camp.find({});
   // console.log(camp);
   res.render('camp/show', { camp });


}));
app.get('/makecamp/new', (req, res) => {
   res.render('camp/new');
});
app.post('/makecamp', validateCamp, catchAsync(async (req, res, next) => {

   const bd = req.body
   const c = new Camp(bd);
   await c.save();
   // console.log(c);
   res.redirect(`/makecamp/${c._id}`);

   // console.log(bd)
}));
app.get('/makecamp/:id', catchAsync(async (req, res) => {

   const { id } = req.params;
   const camp = await Camp.findById(id).populate('review');
   // console.log(camp);
   res.render('camp/details', { camp });

}));

app.get('/makecamp/:id/edit', catchAsync(async (req, res) => {
   const { id } = req.params;
   const prd = await Camp.findById(id);
   res.render('camp/edit', { prd });
}));
app.put('/makecamp/:id', validateCamp, catchAsync(async (req, res) => {
   const { id } = req.params;
   const prd = await Camp.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
   // console.log(prd);
   res.redirect(`/makecamp/${prd._id}`);
   // res.render("products/edit", { prd });
}))
app.delete('/makecamp/:id', catchAsync(async (req, res) => {
   const { id } = req.params;
   const prd = await Camp.findByIdAndDelete(id);
   // const products = await Product.find({});
   // console.log(prd);
   // res.send("skdnldsn");
   res.redirect(`/makecamp`);
   // res.render("products/edit", { prd });
}));
app.post('/makecamp/:id/review', validateReview, catchAsync(async (req, res) => {

   const { id } = req.params;
   const camp = await Camp.findById(id);
   const review1 = req.body;
   const newReview = new Review(review1);
   camp.review.push(newReview);
   await newReview.save();
   await camp.save();
   res.redirect(`/makecamp/${id}`);


}));
app.delete('/makecamp/:id/review/:reviewId', catchAsync(async (req, res) => {

   const { id, reviewId } = req.params;
   await Camp.findByIdAndUpdate(id, { $pull: { review: reviewId } });
   await Review.findByIdAndDelete(reviewId);
   console.log(Camp);
   res.redirect(`/makecamp/${id}`);


}));
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