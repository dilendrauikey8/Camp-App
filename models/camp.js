const mongoose = require('mongoose');
const Review = require('./review');
const User = require('./user');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
   url: String,
   filename: String
});

imageSchema.virtual('thumbnail').get(function () {
   return this.url.replace('/upload', '/upload/w_200');
});

const opts = { toJSON: { virtuals: true } };

const CampSchema = new Schema({
   title: String,
   images: [imageSchema],
   geometry: {
      type: {
         type: String,
         enum: ['Point'],
         required: true
      },
      coordinates: {
         type: [Number],
         required: true
      }
   },
   price: Number,
   description: String,
   location: String,
   author: {
      type: Schema.Types.ObjectId,
      ref: "User"
   },
   review: [
      {
         type: Schema.Types.ObjectId,
         ref: "Review"
      }

   ]
}, opts);
CampSchema.post('findOneAndDelete', async function (ele) {
   if (ele) {
      await Review.deleteMany({
         _id: {
            $in: ele.review
         }
      })
   }
})

CampSchema.virtual('properties.popUpMarkup').get(function () {
   return `
   <strong><a href="/makecamp/${this._id}">${this.title}</a><strong>
   <p>${this.description.substring(0, 20)}...</p>`
});

module.exports = mongoose.model('Camp', CampSchema);