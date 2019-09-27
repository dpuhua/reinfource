/**
 * models user
 */

 const db = require('../config/db')
 const Sequelize = db.sequelize
 const User = Sequelize.import('../schema/user')
 // 自动创建表 force为true时会先删除再创建
User.sync({force: false})
class UserModel {
   static async createUser(data) {
     return await User.create({
       nickName: data.nickName,
       mobile: data.mobile,
       password: data.password
     })
   }
   static async getUserDetail(id) {
     return await User.findOne({
       where: {
         id
       }
     })
   }
   static async login(data) {
     
   }
 }

 module.exports = UserModel
