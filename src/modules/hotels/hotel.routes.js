import { Router } from 'express'
import validate from 'express-validation'

import * as hotelController from './hotel.controllers'
import { authJwt } from '../../services/auth'
import hotelValidation from './hotel.validations'

const routes = new Router()
routes.get('/', authJwt, hotelController.getHotelsList)
routes.post(
  '/',
  authJwt,
  validate(hotelValidation.createHotel),
  hotelController.createHotel
)

routes.get('/:id', authJwt, hotelController.getHotelById)
routes.patch(
  '/:id',
  authJwt,
  validate(hotelValidation.updateHotel),
  hotelController.updateHotel
)
routes.delete('/:id', authJwt, hotelController.deleteHotel)

routes.post('/:id/favorite', authJwt, hotelController.favoriteHotel)

export default routes
