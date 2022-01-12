import { BOOLEAN, DATE, NUMBER, STRING } from 'sequelize'
import seq from '../dbConnect'

const menu = seq.define(
  'm_menu',
  {
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
      type: STRING,
      get() {
        return this.getDataValue('pid')
          .split(';')
          .map((item: any) => {
            return parseInt(item)
          })
      },
      set(val: any) {
        this.setDataValue('pid', val.join(';'))
      }
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
    show: {
      type: BOOLEAN
    },
    createAt: {
      type: DATE
    },
    updatedAt: {
      type: DATE
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
)

export default menu
