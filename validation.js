const Joi = require('@hapi/joi');

//create validation 
const createValidation = (data) => {
  const validSchema = {
    email: Joi.string().min(8).required().email,
    firtsName: Joi.string().min(2),
    lastName: Joi.string().min(2),
    age: Joi.number().optional(),
    birthDate: Joi.date().optional(),
    password: Joi.string().min(4).required()
  }

  return Joi.validate(data, validSchema);

}




module.exports.createValidation = createValidation;