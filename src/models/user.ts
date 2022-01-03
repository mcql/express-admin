import { DATE, NUMBER, STRING } from 'sequelize'

const User = {
  modelName: 'm_user',
  attribute: {
    id: {
      type: NUMBER,
      primaryKey: true
    },
    username: {
      type: STRING
    },
    password: {
      type: STRING
    },
    roles: {
      type: NUMBER
    },
    icon: {
      type: STRING
    },
    createAt: {
      type: DATE
    },
    updatedAt: {
      type: DATE
    }
  },
  options: {
    freezeTableName: true,
    timestamps: false
  }
}

export default User
