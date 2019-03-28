import 'dotenv/config'

const devConfig = {
  MONGODB_URL:
    process.env.MONGODB_URL || 'mongodb://localhost:27017/restic-dev',
  JWT_SECRET: process.env.JWT_SECRET || 'devsecret'
}

const testConfig = {
  MONGODB_URL: 'mongodb://localhost:27017/restic-test',
  JWT_SECRET: 'testsecret'
}

const prodConfig = {
  MONGODB_URL: process.env.MONGODB_URL,
  JWT_SECRET: process.env.JWT_SECRET
}

const defaultConfig = {
  PORT: process.env.PORT || 8080
}

function envConfig (env) {
  switch (env) {
    case 'development':
      return devConfig
    case 'testing':
      return testConfig
    default:
      return prodConfig
  }
}

export default { ...defaultConfig, ...envConfig(process.env.NODE_ENV) }
