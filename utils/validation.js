const Joi = require("@hapi/joi");

const authschema = Joi.object({
    name: Joi.string().min(3).required(),
    mail: Joi.string().min(4).required().email(),
    password: Joi.string().min(8).required(),
  });
  
  const updateschema = Joi.object({
    name: Joi.string().min(3),
    mail: Joi.string().min(4).email(),
    password: Joi.string().min(8),
  });
  
module.exports = {
    authschema,
    updateschema
  };
  