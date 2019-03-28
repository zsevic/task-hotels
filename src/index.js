import express from 'express'
import './config/database'
import middlewareConfig from './config/middleware'
import apiRoutes from './modules'

const app = express()

middlewareConfig(app)
app.get('/', (req, res) => {
  res.send(
    `Hello from task-hotels! Check out <a href="/api-docs"> API documentation</a>`
  )
})
apiRoutes(app)

export default app
