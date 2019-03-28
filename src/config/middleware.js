import morgan from 'morgan'
import bodyParser from 'body-parser'
import compression from 'compression'
import helmet from 'helmet'
import passport from 'passport'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger.json'

const isDev = process.env.NODE_ENV === 'development'
// const isTest = process.env.NODE_ENV === "test";
const isProd = process.env.NODE_ENV === 'production'

export default app => {
  if (isProd) {
    app.use(compression())
    app.use(helmet())
  }
  app.use(bodyParser.json())
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  )
  app.use(passport.initialize())

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

  if (isDev) {
    app.use(morgan('dev'))
  }
}
