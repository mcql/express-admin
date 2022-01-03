import express from 'express'
import bodyParser from 'body-parser'
import seq from './dbConnect'
import userApi from './routes/user'
import loginApi from './routes/login'
import { Request, Response, NextFunction } from 'express'
import checkToken from './utils/checkToken'
import fileUpload from 'express-fileupload'
import uploadApi from './utils/upload'
import path from 'path'

const exp = () => {
  const app = express()
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.get('/', (req, res) => {
    res.send('Hello Express')
  })
  app.listen(3334, () => {
    console.log('express start at http://localhost:3334')
  })
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    )
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With,content-type,Authorization'
    )
    res.setHeader('Access-Control-Expose-Headers', 'Authorization')
    next()
  })
  app.use(express.static(path.join(__dirname, '../public')))
  app.use(checkToken)
  app.use(fileUpload())
  seq
    .authenticate()
    .then(async () => {
      console.log('mysql connect success')
    })
    .catch((err) => {
      console.log(err)
    })
  userApi(app)
  loginApi(app)
  uploadApi(app)
}

exp()
