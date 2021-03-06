import { Sequelize } from 'sequelize-typescript'

const sequelize = new Sequelize('test', 'root', 'dph123', {
  host: '47.92.206.102',
  dialect: 'mysql',
  dialectOptions: {
    // 字符集
    bigNumberStrings: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
    supportBigNumbers: true
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  timezone: '+08:00' // 东8时区
})

export default sequelize
