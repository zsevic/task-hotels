import HTTPStatus from 'http-status'
import Hotel from './hotel.model'
import User from '../users/user.model'

export async function createHotel (req, res) {
  try {
    const hotel = await Hotel.createHotel(req.body, req.user._id)
    return res.status(HTTPStatus.CREATED).json(hotel)
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e)
  }
}

export async function getHotelById (req, res) {
  try {
    const promise = await Promise.all([
      User.findById(req.user._id),
      Hotel.findById(req.params.id).populate('user')
    ])
    const favorite = promise[0]._favorites.isHotelIsFavorite(req.params.id)
    const hotel = promise[1]

    return res.status(HTTPStatus.OK).json({
      ...hotel.toJSON(),
      favorite
    })
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e)
  }
}

export async function getHotelsList (req, res) {
  const limit = parseInt(req.query.limit, 0)
  const skip = parseInt(req.query.limit, 0)

  try {
    const promise = await Promise.all([
      User.findById(req.user._id),
      Hotel.list({ limit, skip })
    ])
    const hotels = promise[1].reduce((arr, hotel) => {
      const favorite = promise[0]._favorites.isHotelIsFavorite(hotel._id)

      arr.push({
        ...hotel.toJSON(),
        favorite
      })
      return arr
    }, [])

    return res.status(HTTPStatus.OK).json(hotels)
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e)
  }
}

export async function updateHotel (req, res) {
  try {
    const hotel = await Hotel.findById(req.params.id)
    if (!hotel.user.equals(req.user._id)) {
      return res.sendStatus(HTTPStatus.UNAUTHORIZED)
    }
    Object.keys(req.body).forEach(key => {
      hotel[key] = req.body[key]
    })
    return res.status(HTTPStatus.OK).json(await hotel.save())
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e)
  }
}

export async function deleteHotel (req, res) {
  try {
    const hotel = await Hotel.findById(req.params.id)
    if (!hotel.user.equals(req.user._id)) {
      return res.sendStatus(HTTPStatus.UNAUTHORIZED)
    }
    await hotel.remove()
    return res.sendStatus(HTTPStatus.OK)
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e)
  }
}

export async function favoriteHotel (req, res) {
  try {
    const user = await User.findById(req.user._id)
    await user._favorites.hotels(req.params.id)
    return res.sendStatus(HTTPStatus.OK)
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e)
  }
}
