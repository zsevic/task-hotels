import userRoutes from './users/user.routes'
import hotelRoutes from './hotels/hotel.routes'
import { authJwt } from '../services/auth'

export default app => {
  app.use('/api/v1/users', userRoutes)
  app.use('/api/v1/hotels', hotelRoutes)

  app.get('/hello', authJwt, (req, res) => {
    res.send('This is a private route!!')
  })
}
