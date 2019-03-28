import mongoose, { Schema } from 'mongoose'
import validator from 'validator'
import { hashSync, compareSync } from 'bcrypt-nodejs'
import jwt from 'jsonwebtoken'
import { passwordReg } from './user.validations'
import constants from '../../config/constants'
import Hotel from '../hotels/hotel.model'

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    // required: [true, 'Email is required'],
    trim: true,
    validate: {
      validator (email) {
        return validator.isEmail(email)
      },
      message: '{VALUE} is not a valid email!'
    }
  },

  userName: {
    type: String,
    unique: true,
    // required: [true, 'UserName is required!'],
    trim: true
  },

  role: {
    type: String,
    trim: true
  },

  password: {
    type: String,
    // required: [true, 'Password is required!'],
    trim: true,
    minlength: [6, 'Password needs to be longer!'],
    validate: {
      validator (password) {
        return passwordReg.test(password)
      },
      message: '{VALUE} is not a valid password!'
    }
  },

  favorites: {
    hotels: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Hotel'
      }
    ]
  }
})

UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password)
  }
  return next()
})

UserSchema.methods = {
  createToken () {
    return jwt.sign(
      {
        _id: this._id
      },
      constants.JWT_SECRET
    )
  },

  toAuthJSON () {
    return {
      _id: this._id,
      userName: this.userName,
      token: `Bearer ${this.createToken()}`
    }
  },

  toJSON () {
    return {
      _id: this._id,
      userName: this.userName
    }
  },

  _hashPassword (password) {
    return hashSync(password)
  },

  authenticateUser (password) {
    return compareSync(password, this.password)
  },

  _favorites: {
    async hotels (hotelId) {
      if (this.favorites.hotels.indexOf(hotelId) >= 0) {
        this.favorites.hotels.remove(hotelId)
        await Hotel.decFavoriteCount(hotelId)
      } else {
        this.favorites.hotels.push(hotelId)
        await Hotel.incFavoriteCount(hotelId)
      }
      return this.save()
    },

    isHotelIsFavorite (hotelId) {
      if (this.favorites.hotels.indexOf(hotelId) >= 0) {
        return true
      }
      return false
    }
  }
}

export default mongoose.model('User', UserSchema)
