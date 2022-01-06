import Menu from '../models/menu'
import { Request, Response } from 'express'
//
// interface objInterface {
//   [key: string]: string
// }

const findOne = async (value: string, res: Response) => {
  try {
    const data = await Menu.findOne({
      where: {
        value: value
      }
    })
    let flag = true
    if (data) {
      flag = false
      res.json({
        code: 500,
        msg: '该菜单已存在',
        payload: {}
      })
    }
    return flag
  } catch (err) {
    res.status(500).send(err)
  }
}

const create = async (req: Request, res: Response) => {
  const flag = await findOne(req.body.value, res)
  if (flag) {
    const MenuInfo = {
      title: req.body.title,
      value: req.body.value,
      pid: req.body.pid || [0],
      icon: req.body.icon || '',
      path: req.body.path || '',
      file: req.body.file || ''
    }
    try {
      await Menu.create(MenuInfo)
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

const updateMenu = async (req: Request, res: Response) => {
  const menuInfo = {
    title: req.body.title,
    value: req.body.value,
    pid: req.body.pid || 0,
    icon: req.body.icon || '',
    path: req.body.path || '',
    file: req.body.file || ''
  }
  try {
    await Menu.update(menuInfo, {
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

const deleteMenu = async (req: Request, res: Response) => {
  try {
    await Menu.destroy({
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

const findAll = async (req: Request, res: Response) => {
  try {
    const data = await Menu.findAll()
    const result = treeData(data)
    res.json({
      code: 0,
      payload: {
        content: result
      },
      msg: '查询成功'
    })
  } catch (err) {
    res.status(500).send(err)
  }
}

function treeData(source: any) {
  const cloneData = JSON.parse(JSON.stringify(source)) // 对源数据深度克隆
  return cloneData.filter((father: any) => {
    const branchArr = cloneData.filter(
      (child: any) => father.id == child.pid[child.pid.length - 1]
    ) //返回每一项的子级数组
    branchArr.length > 0 ? (father.children = branchArr) : '' //如果存在子级，则给父级添加一个children属性，并赋值
    return father.pid[father.pid.length - 1] == '0' //返回第一层
  })
}

export { create, deleteMenu, findAll, updateMenu }
