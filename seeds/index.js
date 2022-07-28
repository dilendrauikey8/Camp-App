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

      const c = new Camp({
         location: `${sample(cities).city},${sample(cities).state}`,
         title: `${sample(descriptors)} ${sample(places)}`
      });
      await c.save();
      // console.log(sample(descriptors));
      console.log(c);
   }

};
seedDB().then(() => {
   mongoose.connection.close();
});



