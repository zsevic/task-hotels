import mongoose, { Schema } from 'mongoose'
import slug from 'slug'
import uniqueValidator from 'mongoose-unique-validator'

const HotelSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'Title is required!'],
      minlength: [3, 'Title needs to be longer!'],
      unique: true
    },

    text: {
      type: String,
      trim: true,
      required: [true, 'Text is required!'],
      minlength: [10, 'Text needs to be longer']
    },

    slug: {
      type: String,
      trim: true,
      lowercase: true
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },

    favoriteCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
)

HotelSchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken!'
})

HotelSchema.pre('validate', function (next) {
  this._slugify()
  next()
})

HotelSchema.methods = {
  _slugify () {
    this.slug = slug(this.title)
  },

  toJSON () {
    return {
      _id: this._id,
      title: this.title,
      text: this.text,
      createdAt: this.createdAt,
      slug: this.slug,
      user: this.user,
      favoriteCount: this.favoriteCount
    }
  }
}

HotelSchema.statics = {
  createHotel (args, user) {
    return this.create({
      ...args,
      user
    })
  },

  list ({ skip = 0, limit = 5 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('user')
  },

  incFavoriteCount (hotelId) {
    return this.findByIdAndUpdate(hotelId, {
      $inc: {
        favoriteCount: 1
      }
    })
  },

  decFavoriteCount (hotelId) {
    return this.findByIdAndUpdate(hotelId, { $inc: { favoriteCount: -1 } })
  }
}

export default mongoose.model('Hotel', HotelSchema)
