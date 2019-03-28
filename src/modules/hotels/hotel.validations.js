import Joi from 'joi'

export default {
  createHotel: {
    body: {
      title: Joi.string()
        .min(3)
        .required(),
      text: Joi.string()
        .min(10)
        .required()
    }
  },
  updateHotel: {
    body: {
      title: Joi.string().min(3),
      text: Joi.string().min(10)
    }
  }
}
