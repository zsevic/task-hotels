import mongoose from 'mongoose'
import faker from 'faker'
import constants from './constants'

import User from '../modules/users/user.model'
import Hotel from '../modules/hotels/hotel.model'

mongoose.Promise = global.Promise
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)

try {
  mongoose.connect(
    constants.MONGODB_URL,
    { useNewUrlParser: true }
  )
} catch (err) {
  mongoose.createConnection(constants.MONGODB_URL)
}

const isTest = process.env.NODE_ENV === 'testing'

export const createUsers = async numOfUsers => {
  for (let i = 0; i < numOfUsers; i++) {
    let user = new User({
      userName: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    })
    await user.save()
  }
}

mongoose.connection
  .once('open', async () => {
    // console.log('Connection with database is established')
    if (!isTest) {
      await User.deleteMany({})
      await Hotel.deleteMany({})
      await createUsers(10)
    }
  })
  .on('error', e => {
    throw e
  })
