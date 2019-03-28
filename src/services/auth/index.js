import passport from 'passport'
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt'
import User from '../../modules/users/user.model'
import constants from '../../config/constants'

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
  secretOrKey: constants.JWT_SECRET
}

const jwtStrategy = new JWTStrategy(jwtOpts, async (payload, done) => {
  try {
    const user = await User.findById(payload._id)
    if (!user) {
      return done(null, false)
    }
    return done(null, user)
  } catch (e) {
    return done(e, false)
  }
})
passport.use(jwtStrategy)

export const authJwt = passport.authenticate('jwt', {
  session: false
})

export { authLocal } from './local'
