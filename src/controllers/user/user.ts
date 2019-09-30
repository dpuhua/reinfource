import * as db from '../../db/test'
import jwt from 'jwt-simple'
import tokenConfig from '../../config/token'

const getToken = (name: string) => {
  const payload = {
    exp: Date.now() + tokenConfig.expires,
    name
  }
  return jwt.encode(payload, tokenConfig.secret)
}

export default class UserController {
  // static async create(ctx: any) {
  //   const req = ctx.request.body
  //   if (req.nickName && req.mobile && req.password) {
  //     try {
  //       const ret = await db.user.createItem(req)
  //       const data = await db.user.getById(ret.rid)
  //       ctx.response.status = 200
  //       ctx.body = {
  //         code: 200,
  //         msg: '创建成功',
  //         data
  //       }
  //     } catch (err) {
  //       ctx.response.status = 412
  //       ctx.body = {
  //         code: 200,
  //         msg: '创建失败',
  //         data: err
  //       }
  //     }
  //   } else {
  //     ctx.response.status = 416
  //     ctx.body = {
  //       code: 200,
  //       msg: '姓名、手机号、密码不能为空'
  //     }
  //   }
  // }

  static async detail(ctx: any) {
    const id = ctx.params.id
    if (id) {
      try {
        const data = await db.user.getById(id)
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
          err
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

  // static async login(ctx: any) {
  //   const req = ctx.request.body
  //   if (req.mobile && req.password) {
  //     const data = await db.user.getByMobile(req.mobile)
  //     const token = getToken(data.nickName)
  //     ctx.response.status = 200
  //     ctx.body = {
  //       code: 200,
  //       msg: '查询成功',
  //       token,
  //       data
  //     }
  //   } else {
  //     ctx.response.status = 416
  //     ctx.body = {
  //       code: -1,
  //       msg: '请输入手机号和密码'
  //     }
  //   }
  // }
}
