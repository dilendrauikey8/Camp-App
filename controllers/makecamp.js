const Camp = require('../models/camp');

module.exports.campShow = async (req, res) => {
   const camp = await Camp.find({});
   // console.log(camp);
   res.render('camp/show', { camp });
}
module.exports.campNewGet = (req, res) => {
   // console.log(req.session);
   res.render('camp/new');
}
module.exports.campNewPost = async (req, res, next) => {

   const bd = req.body
   const c = new Camp(bd);
   c.author = req.user._id;
   await c.save();

   req.flash('success', "Camp is Succesfully created");
   res.redirect(`/makecamp/${c._id}`);
}

module.exports.campDetails = async (req, res) => {

   const { id } = req.params;
   const camp = await Camp.findById(id).populate({
      path: 'review',
      populate: {
         path: 'author'
      }
   }).populate('author');
   if (!camp) {
      req.flash('error', 'Cannot find the camp!');
      return res.redirect('/makecamp');
   }
   // console.log(camp);
   res.render('camp/details', { camp });

}

module.exports.campEditGet = async (req, res) => {
   const { id } = req.params;
   const prd = await Camp.findById(id);
   if (!prd) {
      req.flash('error', 'Cannot find the camp!');
      return res.redirect('/makecamp');
   }
   res.render('camp/edit', { prd });
}

module.exports.campEditPost = async (req, res) => {
   const { id } = req.params;
   const prd = await Camp.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
   // console.log(prd);

   req.flash('success', 'Camp Succcesfully updated');
   res.redirect(`/makecamp/${prd._id}`);
   // res.render("products/edit", { prd });
}

module.exports.campDelete = async (req, res) => {
   const { id } = req.params;
   const prd = await Camp.findByIdAndDelete(id);
   // const products = await Product.find({});
   // console.log(prd);
   // res.send("skdnldsn");
   req.flash('success', 'Camp Succcesfully deleted');
   res.redirect(`/makecamp`);
   // res.render("products/edit", { prd });
};