const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string().required(),
    age: Joi.string().required(),
    breed: Joi.string().required(),
    owner: Joi.string().required(),
    date: Joi.string().required(),
})

module.exports = schema;