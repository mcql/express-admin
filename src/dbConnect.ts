import { Sequelize } from 'sequelize'
import { dbConfig } from './config/db'

const seq = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    pool: {
      max: 5,
      acquire: 30000,
      idle: 10000
    }
  }
)

export default seq
