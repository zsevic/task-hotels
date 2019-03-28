import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const HotelSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Name is required'],
      minlength: [3, 'Name needs to be longer']
    },

    address: {
      type: String,
      trim: true,
      required: [true, 'Address is required'],
      minlength: [5, 'Address needs to be longer']
    },

    image: {
      type: String,
      trim: true,
      required: [true, 'Image is required'],
      minLength: [5, 'Image link needs to be longer']
    },

    description: {
      type: String,
      trim: true,
      required: [true, 'Description is required'],
      minLength: [5, 'Description needs to be longer']
    },

    geolocation: {
      type: String,
      trim: true,
      required: [true, 'Geolocation is required'],
      minLength: [5, 'Geolocation is required']
    },

    rating: {
      type: Number
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },

    reviews: [
      {
        description: {
          type: String
        },

        rating: {
          type: Number,
          min: 0,
          max: 5
        },

        likes: [
          {
            type: Schema.Types.ObjectId,
            ref: 'User'
          }
        ],

        dislikes: [
          {
            type: Schema.Types.ObjectId,
            ref: 'User'
          }
        ]
      }
    ],

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

HotelSchema.methods = {
  toJSON () {
    return {
      _id: this._id,
      name: this.name,
      address: this.address,
      image: this.image,
      description: this.description,
      geolocation: this.geolocation,
      createdAt: this.createdAt,
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

  async list ({ skip, limit, searchData }) {
    let query = [
      {
        $project: {
          name: 1,
          address: 1,
          image: 1,
          description: 1,
          geolocation: 1
        }
      },
      {
        $match: {
          $or: [
            {
              name: { $regex: searchData, $options: 'i' }
            },
            {
              address: {
                $regex: searchData,
                $options: 'i'
              }
            }
          ]
        }
      },
      {
        $sort: {
          name: 1
        }
      },
      { $limit: +limit },
      { $skip: +skip }
    ]

    return this.aggregate(query)
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
