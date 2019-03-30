# task-hotels

> REST API for hotels powered by Node.js, Express, MongoDB

See demo: [https://task-hotels.herokuapp.com/api-docs](https://task-hotels.herokuapp.com/api-docs)

### :sparkles: Features

- CRUD operations
- Node.js with Express
    - pagination, sorting, filtering
- MongoDB database with Mongoose
    - entities: users, hotels
- Authentication
    - powered by JWT
    - sign up, sign in
- Authorization
    - protected endpoints
        - session-based
        - permission-based
        - role-based
- API testing
- API documentation
- Setups
    - Eslint
    - Travis CI
    - Environment variables
    - Git hooks for commit
    - Heroku deployment

### :books: Documentation

* `yarn dev`
* open `http://localhost:8080/api-docs`

### :warning: Prerequisites

* Node.js - v10.10.0
* Npm - 6.7.0
* Yarn - 1.13.0
* MongoDB - v3.6.3

### :wrench: Setup

```bash
git clone https://github.com/zsevic/task-hotels
cd task-hotels
cp .env.sample .env # change values
yarn
yarn dev
```

### :construction_worker: Build

```bash
yarn build
yarn start
```

### :rotating_light: Testing

```bash
yarn test
```

### :arrow_right: Usage

check API tests for request body

```bash
POST /api/v1/users/signup
POST /api/v1/users/login
GET /api/v1/users/:id/favorite

GET /api/v1/hotels/
GET /api/v1/hotels/?limit=4
GET /api/v1/hotels/?limit=4&skip=2
GET /api/v1/hotels/?search=<NAME or ADDRESS>
POST /api/v1/hotels/
POST /api/v1/hotels/:id
PATCH /api/v1/hotels/:id
DELETE /api/v1/hotels/:id
POST /api/v1/hotels/:id/favorite
GET /api/v1/hotels/:id/reviews
```
