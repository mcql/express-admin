import { Router, Express } from 'express'
import { create, findAll, deleteUser, updateUser } from '../controllers/user'

const userApi = (app: Express) => {
  const router = Router()
  router.post('/list', create)
  router.get('/list', findAll)
  router.delete('/list/:id', deleteUser)
  router.put('/list/:id', updateUser)
  app.use('/api/user', router)
}

export default userApi
