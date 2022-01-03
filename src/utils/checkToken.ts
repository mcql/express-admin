import { NextFunction, Request, Response } from 'express'
import { verifyToken } from './auth'
import jwt from '../config/jwt'

const checkToken = async (req: Request, res: Response, next: NextFunction) => {
  const url = req.originalUrl.split('?')[0]
  const whiteUrl: string[] = jwt.whiteUrl
  if (whiteUrl.indexOf(url) > -1) {
    return next()
  }
  const result = await verifyToken(
    req.headers.authorization?.replace('Bearer ', '') || ''
  )
  if (result.code === 200) {
    return next()
  } else {
    res.send(result)
  }
}

export default checkToken
