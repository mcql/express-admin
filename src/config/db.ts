import { Options } from 'sequelize'

interface SeqOptionsInterface extends Options {
  database: string
  username: string
  password: string
}

const dbConfig: SeqOptionsInterface = {
  database: 'ming',
  username: 'ming',
  password: '123456',
  host: '121.36.148.247',
  port: 3306,
  dialect: 'mysql'
}

export { dbConfig }
