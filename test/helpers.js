import request from 'supertest'
import { expect } from 'chai'
import app from '../src'

global.api = request(app)
global.expect = expect
