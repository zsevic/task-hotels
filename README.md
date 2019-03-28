# restic

> REST API boilerplate powered by Node.js, Express, MongoDB


See demo: [https://restic.herokuapp.com/api-docs](https://restic.herokuapp.com/api-docs)

### :sparkles: Features

- [x] CRUD operations
- [x] Node.js with Express
- [x] MongoDB database with MongoDB
    * entities: users, hotels
- [x] Authentication
    - [x] local
    * powered by JWT
    * sign up, sign in
- [x] Authorization
    * protected endpoints
        * session-based
        * permission-based
        * role-based
- [x] API testing
- [x] API documentation
- [x] Setups
    - [x] Eslint
    - [x] Travis CI
    - [x] Environment variables
    - [x] Git hooks for commit
    - [x] Heroku deployment

### :wrench: Setup

```bash
git clone https://github.com/zsevic/task-hotels
cd task-hotels
cp .env.sample .env # change values
yarn
yarn dev
```

### :books: Documentation

* `yarn dev`
* open `http://localhost:8080/api-docs`