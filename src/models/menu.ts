import { DATE, NUMBER, STRING } from 'sequelize'

const Menu = {
  modelName: 'm_menu',
  attribute: {
    id: {
      type: NUMBER,
      primaryKey: true
    },
    title: {
      type: STRING
    },
    value: {
      type: STRING
    },
    pid: {
      type: NUMBER
    },
    icon: {
      type: STRING
    },
    path: {
      type: STRING
    },
    file: {
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

export default Menu
