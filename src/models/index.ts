import seq from '../dbConnect'
import user from './user'
import menu from './menu'

export const User = seq.define(user.modelName, user.attribute, user.options)
export const Menu = seq.define(menu.modelName, menu.attribute, menu.options)
