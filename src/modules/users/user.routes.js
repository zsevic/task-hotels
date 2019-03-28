import { Router } from 'express'
import validate from 'express-validation'
import * as userController from './user.controllers'
import userValidation from './user.validations'
import { authLocal, authJwt, isFavoritesOwner } from '../../services/auth'

const routes = new Router()
routes.get(
  '/:id/favorites',
  authJwt,
  isFavoritesOwner,
  userController.getFavorites
)
routes.post('/signup', validate(userValidation.signup), userController.signUp)
routes.post('/login', authLocal, userController.login)

export default routes
