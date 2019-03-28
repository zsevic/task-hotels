import userRoutes from './users/user.routes'
import hotelRoutes from './hotels/hotel.routes'

export default app => {
  app.use('/api/v1/users', userRoutes)
  app.use('/api/v1/hotels', hotelRoutes)
}
