import { User } from '../models'
import { Request, Response } from 'express'

interface objInterface {
  [key: string]: string
}

const findOne = async (username: string, res: Response) => {
  try {
    const data = await User.findOne({
      where: {
        username: username
      }
    })
    let flag = true
    if (data) {
      flag = false
      res.json({
        code: 500,
        msg: '该用户已存在',
        payload: {}
      })
    }
    return flag
  } catch (err) {
    res.status(500).send(err)
  }
}

// 创建用户
const create = async (req: Request, res: Response) => {
  const flag = await findOne(req.body.username, res)
  if (flag) {
    const userInfo = {
      username: req.body.username,
      password: req.body.password,
      roles: req.body.roles || 0,
      icon: req.body.icon || ''
    }
    try {
      await User.create(userInfo)
      res.json({
        code: 0,
        payload: {},
        msg: '创建成功'
      })
    } catch (err) {
      res.status(500).send(err)
    }
  }
}

const updateUser = async (req: Request, res: Response) => {
  const userInfo = {
    username: req.body.username,
    password: req.body.password,
    roles: req.body.roles || 0,
    icon: req.body.icon || ''
  }
  try {
    await User.update(userInfo, {
      where: {
        id: req.params.id
      }
    })
    res.json({
      code: 0,
      payload: {},
      msg: '更新成功'
    })
  } catch (err) {
    res.status(500).send(err)
  }
}

// 删除
const deleteUser = async (req: Request, res: Response) => {
  try {
    await User.destroy({
      where: {
        id: req.params.id
      }
    })
    res.json({
      code: 0,
      payload: {},
      msg: '删除成功'
    })
  } catch (err) {
    res.status(500).send(err)
  }
}

// 查找所有用户
const findAll = async (req: Request, res: Response) => {
  try {
    const limit: number = parseInt(
      typeof req.query.size === 'string' ? req.query.size : '999'
    )
    const offset: number =
      (parseInt(typeof req.query.page === 'string' ? req.query.page : '1') -
        1) *
      parseInt(typeof req.query.size === 'string' ? req.query.size : '999')
    const where: objInterface = {}
    if (req.query.username) {
      where.username = <string>req.query.username
    }
    const data = await User.findAll({
      where: where,
      limit: limit,
      offset: offset
    })
    const totalCount = await User.findAndCountAll()
    res.json({
      code: 0,
      payload: {
        content: data,
        total: totalCount.count
      },
      msg: '查询成功'
    })
  } catch (err) {
    res.status(500).send(err)
  }
}

export { create, deleteUser, findAll, updateUser }
