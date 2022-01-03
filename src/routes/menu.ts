import { Router, Express } from 'express'
import { create, findAll, updateMenu, deleteMenu } from '../controllers/menu'

const menuApi = (app: Express) => {
  const router = Router()
  router.post('/list', create)
  router.get('/list', findAll)
  router.delete('/list/:id', deleteMenu)
  router.put('/list/:id', updateMenu)
  app.use('/api/menu', router)
}

export default menuApi
