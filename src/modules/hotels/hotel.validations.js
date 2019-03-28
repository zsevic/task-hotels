import Joi from 'joi'

export default {
  createHotel: {
    body: {
      name: Joi.string()
        .min(3)
        .required(),
      address: Joi.string()
        .min(10)
        .required(),
      image: Joi.string()
        .min(5)
        .required(),
      description: Joi.string()
        .min(5)
        .required(),
      geolocation: Joi.string()
        .min(5)
        .required()
    }
  },
  updateHotel: {
    body: {
      name: Joi.string().min(3),
      text: Joi.string().min(10)
    }
  }
}
