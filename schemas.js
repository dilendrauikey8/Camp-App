const Joi = require('joi');
// const CampSchema = Joi.object({
//    title: Joi.string().required(),
//    price: Joi.number().required().min(1),
//    image: Joi.string().required(),
//    location: Joi.string().required(),
//    description: Joi.string().required()
// });
module.exports.CampSchema = Joi.object({
   title: Joi.string().required(),
   price: Joi.number().required().min(1),
   // image: Joi.string().required(),
   location: Joi.string().required(),
   description: Joi.string().required(),
   deleteImages:Joi.array()
});

module.exports.ReviewSchema = Joi.object({
   rating: Joi.number().min(1).max(10).required(),
   review:Joi.string().required()
});