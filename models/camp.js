const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;
const CampSchema = new Schema({
   title: String,
   image: String,
   price: Number,
   description: String,
   location: String,
   review: [
      {
         type: Schema.Types.ObjectId,
         ref: "Review"
      }

   ]
});
CampSchema.post('findOneAndDelete', async function (ele) {
   if (ele) {
      await Review.deleteMany({
         _id: {
            $in: ele.review
         }
      })
   }
})

module.exports = mongoose.model('Camp', CampSchema);