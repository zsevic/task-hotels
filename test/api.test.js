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

      /* it('should return error when request body is not valid', done => {
        api
          .post('/api/v1/users/signup')
          .send({
            test: 'test@test.com'
          })
          .expect(400, done)
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
          email: 'test@test.com',
          password: 'Test1234'
        })

        const response = await api
          .post('/api/v1/hotels')
          .set('Authorization', token)
          .send({
            title: 'title',
            text: 'text text text'
          })

        expect(response.statusCode).to.be.equal(201)
      })

      it('should return error when request body is not valid', async () => {
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
              title: 'ti',
              text: 'text text text'
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
            title: 'test',
            text: 'text text text'
          })
          .expect(401, done)
      })
    })

    describe('GET /api/v1/hotels/:id', () => {
      it('should get hotel with given id', async () => {
        const {
          body: { token }
        } = await api.post('/api/v1/users/login').send({
          email: 'test@test.com',
          password: 'Test1234'
        })

        const hotel = await api
          .post('/api/v1/hotels')
          .set('Authorization', token)
          .send({
            title: 'title12',
            text: 'text text text'
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
          email: 'test@test.com',
          password: 'Test1234'
        })

        const hotel = await api
          .post('/api/v1/hotels')
          .set('Authorization', token)
          .send({
            title: 'title2',
            text: 'text text text'
          })

        const response = await api
          .patch(`/api/v1/hotels/${hotel.body._id}`)
          .set('Authorization', token)
          .send({
            title: 'title6',
            text: 'text text text'
          })

        expect(response.statusCode).to.be.equal(200)
      })

      it('should return error when hotel with given id is not found', async () => {
        const {
          body: { token }
        } = await api.post('/api/v1/users/login').send({
          email: 'test@test.com',
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
            title: 'test'
          })
          .expect(401, done)
      })
    })

    describe('DELETE /api/v1/hotels/:id', () => {
      it('should delete hotel with given id', async () => {
        const {
          body: { token }
        } = await api.post('/api/v1/users/login').send({
          email: 'test@test.com',
          password: 'Test1234'
        })
        const hotel = await api
          .post('/api/v1/hotels')
          .set('Authorization', token)
          .send({
            title: 'title3',
            text: 'text text text'
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
          email: 'test@test.com',
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
          email: 'test@test.com',
          password: 'Test1234'
        })

        const hotel = await api
          .post('/api/v1/hotels')
          .set('Authorization', token)
          .send({
            title: 'title123',
            text: 'text text text'
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
