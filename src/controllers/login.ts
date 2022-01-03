import { User } from '../models'
import { Request, Response } from 'express'
import { setToken } from '../utils/auth'

// 查找用户
const findOne = async (req: Request, res: Response) => {
  try {
    const data = await User.findOne({
      where: {
        username: req.query.username,
        password: req.query.password || ''
      }
    })
    if (!data) {
      res.json({ code: -1, msg: '登录失败' })
    } else {
      res.json({
        code: 0,
        msg: '登录成功',
        payload: {
          data: data,
          token: setToken({ username: req.body.username })
        }
      })
    }
  } catch (err) {
    res.status(500).send(err)
  }
}

export { findOne }
