import jsonwebtoken, { JwtPayload, VerifyErrors } from 'jsonwebtoken'
import jwt from '../config/jwt'
const setToken = (obj: any) => {
  const token = jsonwebtoken.sign(obj, jwt.secret, { expiresIn: jwt.expiresIn })
  return token
}

interface dataInterface {
  code: number
  msg: string
  obj: VerifyErrors | null | JwtPayload | undefined
}

const verifyToken = (token: string): any => {
  return jsonwebtoken.verify(
    token,
    jwt.secret,
    (err: VerifyErrors | null, res: JwtPayload | undefined) => {
      const data: dataInterface = {
        code: 200,
        msg: '',
        obj: {}
      }
      if (err) {
        data.code = 401
        data.msg = 'token失效'
        data.obj = err
      } else {
        data.code = 200
        data.msg = 'token验证成功'
        data.obj = res
      }
      return data
    }
  )
}

export { setToken, verifyToken }
