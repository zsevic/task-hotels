import mongoose from 'mongoose'
import constants from '../src/config/constants'

describe('API tests', () => {
  before(done => {
    mongoose.connect(
      constants.MONGODB_URL,
      { useNewUrlParser: true }
    )
    const db = mongoose.connection
    db.once('open', done)
  })

  after(done => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done)
    })
  })

  describe('Users', () => {
    describe('POST /api/v1/users/signup', () => {
      it('should create a new user', done => {
        api
          .post('/api/v1/users/signup')
          .send({
            email: 'test@test.com',
            password: 'Test1234',
            userName: 'test',
            role: 'user'
          })
          .expect(201, done)
      })

      it('should create a new admin user', done => {
        api
          .post('/api/v1/users/signup')
          .send({
            email: 'test23@test.com',
            password: 'Test1234',
            userName: 'test23',
            role: 'admin'
          })
          .expect(201, done)
      })

      /* it('should return error when request body is not valid', done => {
        api
          .post('/api/v1/users/signup')
          .send({
            test: 'test@test.com'
          })
          .expect(400, done)
      }) */
    })

    describe('GET /api/v1/users/:id/favorites', () => {
      it("should get user's favorite hotels", async () => {
        const {
          body: { _id, token }
        } = await api.post('/api/v1/users/login').send({
          email: 'test23@test.com',
          password: 'Test1234'
        })

        const hotels = await api
          .get(`/api/v1/users/${_id}/favorites`)
          .set('Authorization', token)

        expect(hotels.statusCode).to.be.equal(200)
      })

      /*       it('should return error when user is not authorized', done => {
        api.get(`/api/v1/hotels`).expect(401, done)
      }) */
    })

    describe('POST /api/v1/users/login', () => {
      it('should login with valid credentials', done => {
        api
          .post('/api/v1/users/login')
          .send({
            email: 'test@test.com',
            password: 'Test1234'
          })
          .expect(200, done)
      })

      it('should return error when credentials are not valid', done => {
        api
          .post('/api/v1/users/login')
          .send({
            email: 'test@test.com',
            password: 'test1234'
          })
          .expect(401, done)
      })
    })
  })

  describe('Hotels', () => {
    describe('GET /api/v1/hotels', () => {
      it('should get all hotels', async () => {
        const {
          body: { token }
        } = await api.post('/api/v1/users/login').send({
          email: 'test@test.com',
          password: 'Test1234'
        })

        const response = await api
          .get('/api/v1/hotels')
          .set('Authorization', token)

        expect(response.statusCode).to.be.equal(200)
      })

      it('should return error when user is not authorized', done => {
        api.get(`/api/v1/hotels`).expect(401, done)
      })
    })

    describe('POST /api/v1/hotels', () => {
      it('should create new hotel', async () => {
        const {
          body: { token }
        } = await api.post('/api/v1/users/login').send({
          email: 'test23@test.com',
          password: 'Test1234'
        })

        const response = await api
          .post('/api/v1/hotels')
          .set('Authorization', token)
          .send({
            name: 'hotel name1223',
            address: 'hotel addr2ess',
            image: 'hotel imag2e',
            description: 'hotel descriptio2n',
            geolocation: 'hotel geolocatio2n'
          })

        expect(response.statusCode).to.be.equal(201)
      })

      it('should return error when user is not admin', async () => {
        const {
          body: { token }
        } = await api.post('/api/v1/users/login').send({
          email: 'test@test.com',
          password: 'Test1234'
        })

        try {
          const response = await api
            .post('/api/v1/hotels')
            .set('Authorization', token)
            .send({
              name: 'ho2tel name123',
              address: 'ho2tel address',
              image: 'ho2tel image',
              description: 'ho2tel description',
              geolocation: 'h2otel geolocation'
            })

          expect(response.statusCode).to.be.equal(401)
        } catch (err) {
          expect(err.status).to.be.equal(401)
        }
      })

      it('should return error when request body is not valid', async () => {
        const {
          body: { token }
        } = await api.post('/api/v1/users/login').send({
          email: 'test23@test.com',
          password: 'Test1234'
        })

        try {
          const response = await api
            .post('/api/v1/hotels')
            .set('Authorization', token)
            .send({
              name: 'n',
              address: 'address'
            })

          expect(response.status).to.be.equal(400)
        } catch (err) {
          expect(err.status).to.be.equal(400)
        }
      })

      it('should return error when user is not authorized', done => {
        api
          .post(`/api/v1/hotels/`)
          .send({
            name: 'hotel name',
            address: 'hotel address',
            image: 'hotel image',
            description: 'hotel description',
            geolocation: 'hotel geolocation'
          })
          .expect(401, done)
      })
    })

    describe('GET /api/v1/hotels/:id', () => {
      it('should get hotel with given id', async () => {
        const {
          body: { token }
        } = await api.post('/api/v1/users/login').send({
          email: 'test23@test.com',
          password: 'Test1234'
        })

        const hotel = await api
          .post('/api/v1/hotels')
          .set('Authorization', token)
          .send({
            name: 'hotel name3',
            address: 'hotel a2ddress',
            image: 'hotel imag2e',
            description: 'hotel2 description',
            geolocation: 'hotel 2geolocation'
          })

        const response = await api
          .get(`/api/v1/hotels/${hotel.body._id}`)
          .set('Authorization', token)

        expect(response.statusCode).to.be.equal(200)
      })

      it('should return error when user is not authorized', done => {
        api.get(`/api/v1/hotels/5c8857861993271ea24c5de4`).expect(401, done)
      })
    })

    describe('PATCH /api/v1/hotels/:id', () => {
      it('should patch hotel with given id', async () => {
        const {
          body: { token }
        } = await api.post('/api/v1/users/login').send({
          email: 'test23@test.com',
          password: 'Test1234'
        })

        const hotel = await api
          .post('/api/v1/hotels')
          .set('Authorization', token)
          .send({
            name: 'hotel n2ame123',
            address: 'hotel2 address',
            image: 'hotel im2age',
            description: 'hot2el description',
            geolocation: 'ho2tel geolocation'
          })

        const response = await api
          .patch(`/api/v1/hotels/${hotel.body._id}`)
          .set('Authorization', token)
          .send({
            name: 'hotel name1123',
            address: 'hotel add2ress',
            image: 'hotel image2',
            description: 'hotel 2description',
            geolocation: 'hotel g2eolocation'
          })

        expect(response.statusCode).to.be.equal(200)
      })

      it('should return error when hotel with given id is not found', async () => {
        const {
          body: { token }
        } = await api.post('/api/v1/users/login').send({
          email: 'test23@test.com',
          password: 'Test1234'
        })

        try {
          const response = await api
            .delete('/api/v1/hotels/5c8857861993271ea24c5de5')
            .set('Authorization', token)
          expect(response.status).to.be.equal(400)
        } catch (err) {
          expect(err.status).to.be.equal(400)
        }
      })

      it('should return error when user is not authorized', done => {
        api
          .patch(`/api/v1/hotels/5c8857861993271ea24c5de4`)
          .send({
            name: 'name'
          })
          .expect(401, done)
      })
    })

    describe('DELETE /api/v1/hotels/:id', () => {
      it('should delete hotel with given id', async () => {
        const {
          body: { token }
        } = await api.post('/api/v1/users/login').send({
          email: 'test23@test.com',
          password: 'Test1234'
        })
        const hotel = await api
          .post('/api/v1/hotels')
          .set('Authorization', token)
          .send({
            name: 'hotel name1',
            address: 'hotel address',
            image: 'hotel image',
            description: 'hotel description',
            geolocation: 'hotel geolocation'
          })

        const response = await api
          .delete(`/api/v1/hotels/${hotel.body._id}`)
          .set('Authorization', token)

        expect(response.statusCode).to.be.equal(200)
      })

      it('should return error when hotel with given id is not found', async () => {
        const {
          body: { token }
        } = await api.post('/api/v1/users/login').send({
          email: 'test23@test.com',
          password: 'Test1234'
        })

        try {
          const response = await api
            .delete('/api/v1/hotels/5c8857861993271ea24c5de5')
            .set('Authorization', token)
          expect(response.status).to.be.equal(400)
        } catch (err) {
          expect(err.status).to.be.equal(400)
        }
      })

      it('should return error when user is not authorized', done => {
        api.delete(`/api/v1/hotels/5c8857861993271ea24c5de4`).expect(401, done)
      })
    })

    describe('POST /api/v1/hotels/:id/favorite', () => {
      it('should favorite a hotel with given ID', async () => {
        const {
          body: { token }
        } = await api.post('/api/v1/users/login').send({
          email: 'test23@test.com',
          password: 'Test1234'
        })

        const hotel = await api
          .post('/api/v1/hotels')
          .set('Authorization', token)
          .send({
            name: 'hotel name123',
            address: 'hotel address',
            image: 'hotel image',
            description: 'hotel description',
            geolocation: 'hotel geolocation'
          })

        const response = await api
          .post(`/api/v1/hotels/${hotel.body._id}/favorite`)
          .set('Authorization', token)

        expect(response.statusCode).to.be.equal(200)
      })

      it('should return error when user is not authorized', done => {
        api
          .post(`/api/v1/hotels/5c8857861993271ea24c5de4/favorite`)
          .expect(401, done)
      })
    })
  })
})
