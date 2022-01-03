import { Router, Express } from 'express'
import { findOne } from '../controllers/login'

const loginApi = (app: Express) => {
  const router = Router()
  router.get('/login', findOne)
  app.use('/api', router)
}

export default loginApi
