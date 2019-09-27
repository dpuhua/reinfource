/**
 * schema user
 */
const moment = require('moment')
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user', {
    // 用户id
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: true,
      autoIncrement: true
    },
    // 姓名
    nickName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      get() {
        return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      get() {
        return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  },
  {
    // tue则表名和model相同，为false会变成复数，如果指定的表名本来就是复数则不变
    freezeTableName: true
  })
}