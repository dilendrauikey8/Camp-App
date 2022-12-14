const Camp = require('../models/camp');
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
const { cloudinary } = require('../cloudinary');

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

   const geoData = await geocoder.forwardGeocode({
      query: req.body.location,
      limit: 1
   }).send();

   const bd = req.body
   const c = new Camp(bd);
   c.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
   c.geometry = geoData.body.features[0].geometry;
   c.author = req.user._id;
   // console.log(c);

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
   const geoData = await geocoder.forwardGeocode({
      query: req.body.location,
      limit: 1
   }).send();

   const { id } = req.params;
   const prd = await Camp.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
   const img = req.files.map(f => ({ url: f.path, filename: f.filename }));
   prd.geometry = geoData.body.features[0].geometry;
   prd.images.push(...img);// pushing array
   await prd.save();

   if (req.body.deleteImages) {
      for (let filename of req.body.deleteImages) {
         await cloudinary.uploader.destroy(filename);
      }
      await prd.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
   }

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