import { normalizePort } from '../src/bin/utils'
import { envConfig } from '../src/config/constants'

describe('normalize port', () => {
  it('should return port', () => {
    let port = normalizePort(8080)

    expect(port).to.be.equal(8080)
  })
})

describe('env config', () => {
  it('should return test env configuration', () => {
    const { JWT_SECRET } = envConfig('testing')

    expect(JWT_SECRET).to.be.equal('testsecret')
  })
})
