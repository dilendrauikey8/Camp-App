const mongoose = require('mongoose');
const Camp = require('../models/camp');
const cities = require('./cities');
const { places, descriptors } = require('./helper');
mongoose.connect('mongodb://localhost:27017/campApp', { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => {
      console.log("connection open!!!");
   })
   .catch(err => {
      console.log("OH NO ERROR!!!!");
      console.log(err);
   });


const sample = arr => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
   await Camp.deleteMany({});
   for (let i = 0; i < 50; i++) {
      const pric = Math.floor(Math.random() * 100000);
      const c = new Camp({
         author: "6315c7a8519267f054280b03",
         location: `${sample(cities).city},${sample(cities).state}`,
         title: `${sample(descriptors)} ${sample(places)}`,
         price: pric,
         description: "trying to explore the life",
         images: [{
            url: 'https://res.cloudinary.com/dbpdgxlax/image/upload/v1662557038/CampApp/vob72apgclkjdd1iadaw.png',
            filename: 'CampApp/vob72apgclkjdd1iadaw',

         },
         {
            url: 'https://res.cloudinary.com/dbpdgxlax/image/upload/v1662557050/CampApp/lo8v8eunvhgjd7qjaqu3.png',
            filename: 'CampApp/lo8v8eunvhgjd7qjaqu3',

         }]
      });
      await c.save();
      // console.log(sample(descriptors));
      // console.log(c);
   }

};
seedDB().then(() => {
   mongoose.connection.close();
});



