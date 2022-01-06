import seq from '../dbConnect'
import user from './user'

export const User = seq.define(user.modelName, user.attribute, user.options)
