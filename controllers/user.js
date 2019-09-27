const UserModel = require('../models/user')
class UserController {
  static async create(ctx) {
    let req = ctx.request.body
    if (req.nickName && req.password) {
      try {
        const ret = await UserModel.createUser(req)
        const data = await UserModel.getUserDetail(ret.id)
        ctx.response.status = 200
        ctx.body = {
          code: 200,
          msg: '创建成功',
          data
        }
      } catch (err) {
        ctx.response.status = 412
        ctx.body = {
          code: 200,
          msg: '创建失败',
          data: err
        }
      }
    } else {
      ctx.response.status = 416
      ctx.body = {
        code: 200,
        msg: '姓名和手机号不能为空'
      }
    }
  }

  static async detail(ctx) {
    let id = ctx.params.id
    if (id) {
      try {
        let data = await UserModel.getUserDetail(id)
        ctx.response.status = 200
        ctx.body = {
          code: 200,
          msg: '查询成功',
          data
        }
      } catch (err) {
        ctx.response.status = 412
        ctx.body = {
          code: 412,
          msg: '查询失败',
          data
        }
      }
    } else {
      ctx.response.status = 416
      ctx.body = {
        code: 416,
        msg: 'id不能为空'
      }
    }
  }
}

module.exports = UserController