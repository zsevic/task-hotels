import mongoose from 'mongoose'
import faker from 'faker'
import constants from './constants'

import User from '../modules/users/user.model'
import Hotel from '../modules/hotels/hotel.model'

mongoose.Promise = global.Promise
mongoose.set('useFindAndModify', false)

try {
  mongoose.connect(
    constants.MONGODB_URL,
    { useNewUrlParser: true, useCreateIndex: true }
  )
} catch (err) {
  mongoose.createConnection(constants.MONGODB_URL)
}

const isTest = process.env.NODE_ENV === 'testing'

export const seedDb = async num => {
  for (let i = 0; i < num; i++) {
    let user = new User({
      userName: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    })
    await user.save()
  }

  let admin = new User({
    userName: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: 'admin'
  })
  await admin.save()

  for (let i = 0; i < num; i++) {
    let hotel = {
      name: faker.company.companyName(),
      address: faker.address.streetAddress(),
      image: faker.image.imageUrl(),
      description: faker.lorem.words(),
      geolocation: `${faker.address.latitude()} ${faker.address.longitude()}`
    }
    await Hotel.createHotel(hotel, admin._id)
  }
}

mongoose.connection
  .once('open', async () => {
    // console.log('Connection with database is established')
    if (!isTest) {
      await User.deleteMany({})
      await Hotel.deleteMany({})
      await seedDb(10)
    }
  })
  .on('error', e => {
    throw e
  })
