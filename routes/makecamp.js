const express = require('express');
const router = express.Router();
const Camp = require('../models/camp');
const { CampSchema, ReviewSchema } = require('../schemas.js');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

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

router.get('/', catchAsync(async (req, res) => {
   const camp = await Camp.find({});
   // console.log(camp);
   res.render('camp/show', { camp });


}));
router.get('/new', (req, res) => {
   res.render('camp/new');
});
router.post('/', validateCamp, catchAsync(async (req, res, next) => {

   const bd = req.body
   const c = new Camp(bd);
   await c.save();
   // console.log(c);
   req.flash('success',"Camp is Succesfully created");
   res.redirect(`/makecamp/${c._id}`);

   // console.log(bd)
}));
router.get('/:id', catchAsync(async (req, res) => {

   const { id } = req.params;
   const camp = await Camp.findById(id).populate('review');
   if(!camp)
   {
      req.flash('error','Cannot find the camp!');
      return res.redirect('/makecamp');
   }
   // console.log(camp);
   res.render('camp/details', { camp });

}));

router.get('/:id/edit', catchAsync(async (req, res) => {
   const { id } = req.params;
   const prd = await Camp.findById(id);
   if(!prd)
   {
      req.flash('error','Cannot find the camp!');
      return res.redirect('/makecamp');
   }
   res.render('camp/edit', { prd });
}));
router.put('/:id', validateCamp, catchAsync(async (req, res) => {
   const { id } = req.params;
   const prd = await Camp.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
   // console.log(prd);

   req.flash('success','Camp Succcesfully updated');
   res.redirect(`/makecamp/${prd._id}`);
   // res.render("products/edit", { prd });
}))
router.delete('/:id', catchAsync(async (req, res) => {
   const { id } = req.params;
   const prd = await Camp.findByIdAndDelete(id);
   // const products = await Product.find({});
   // console.log(prd);
   // res.send("skdnldsn");
   req.flash('success','Camp Succcesfully deleted');
   res.redirect(`/makecamp`);
   // res.render("products/edit", { prd });
}));

module.exports = router;