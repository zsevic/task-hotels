import http from 'http'
import app from '../index'
import constants from '../config/constants'
import { onError } from './utils'

const server = http.createServer(app)
server.listen(constants.PORT)

server.on('listening', onListening)
server.on('error', onError)

function onListening () {
  const addr = server.address()
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`
  console.log(`Listening on ${bind}`)
}
