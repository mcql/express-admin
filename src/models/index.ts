import user from './user'
import seq from '../dbConnect'

export const User = seq.define(user.modelName, user.attribute, user.options)
