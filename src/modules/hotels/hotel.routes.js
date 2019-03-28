import { Router } from 'express'
import validate from 'express-validation'

import * as hotelController from './hotel.controllers'
import { authJwt, isAdmin } from '../../services/auth'
import hotelValidation from './hotel.validations'

const routes = new Router()
routes.get('/', hotelController.getHotelsList)
routes.post(
  '/',
  authJwt,
  isAdmin,
  validate(hotelValidation.createHotel),
  hotelController.createHotel
)

routes.get('/:id', hotelController.getHotelById)
routes.patch(
  '/:id',
  authJwt,
  isAdmin,
  validate(hotelValidation.updateHotel),
  hotelController.updateHotel
)
routes.delete('/:id', authJwt, isAdmin, hotelController.deleteHotel)

routes.post('/:id/favorite', authJwt, hotelController.favoriteHotel)

export default routes
