import Joi from 'joi'

// export const passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/

export default {
  signup: {
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(8)
      //  .regex(passwordReg)
      .required(),
    userName: Joi.string().required()
  }
}
