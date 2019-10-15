import { user } from '../../db/test'
import jwt from 'jwt-simple'
import tokenConfig from '../../config/token'
import Valid from '../../tools/valid'

const getToken = (name: string) => {
  const payload = {
    exp: Date.now() + tokenConfig.expires,
    name
  }
  return jwt.encode(payload, tokenConfig.secret)
}

export default class UserController {
  static async create(ctx: any) {
    const req = ctx.request.body
    if (req.userName && req.mobile && req.password) {
      try {
        const ret = await user.createItem(req)
        const data = await user.getById(ret.rid)
        ctx.body = {
          code: 1,
          msg: '创建成功',
          data
        }
      } catch (err) {
        ctx.body = {
          code: -1,
          msg: '创建失败',
          err
        }
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '姓名、手机号、密码不能为空'
      }
    }
  }

  static async detail(ctx: any) {
    const id = ctx.params.id
    if (id) {
      try {
        const data = await user.getById(id)
        if (data) {
          ctx.body = {
            code: 1,
            msg: '查询成功',
            data
          }
        } else {
          ctx.body = {
            code: -1,
            meg: '用户不存在'
          }
        }
      } catch (err) {
        ctx.body = {
          code: -1,
          msg: '查询失败',
          err
        }
      }
    } else {
      ctx.body = {
        code: -1,
        msg: 'id不能为空'
      }
    }
  }

  static async register(ctx: any) {
    const req = ctx.request.body
    if (req.mobile && req.userName && req.password) {
      try {
        if (Valid.validMobile(req.userName)) {
          ctx.body = {
            code: -1,
            msg: '用户名不能为11位数字'
          }
          return
        }
        let data = await user.getByMobile(req.mobile)
        if (data) {
          ctx.body = {
            code: -1,
            msg: '手机号已存在'
          }
        } else {
          data = await user.getByuserName(req.userName)
          if (data) {
            ctx.body = {
              code: -1,
              msg: '用户名已存在'
            }
          } else {
            await UserController.create(ctx)
          }
        }
      } catch (err) {
        ctx.body = {
          code: -1,
          msg: '创建失败',
          err
        }
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '手机号、用户名、密码不能为空'
      }
    }

  }

  static async login(ctx: any) {
    const req = ctx.request.body
    if (req.name && req.password) {
      try {
        let data = await user.getByMobile(req.name)
        if (!data) {
          data = await user.getByuserName(req.name)
        }
        if (data) {
          if (data.password === req.password) {
            const token = getToken(data.userName)
            const Data = {
              id: data.rid,
              userName: data.userName,
              mobile: data.mobile
            }
            ctx.body = {
              code: 1,
              msg: '登录成功',
              token,
              Data
            }
          } else {
            ctx.body = {
              code: -1,
              msg: '密码错误'
            }
          }
        } else {
          // 无用户
          ctx.body = {
            code: -1,
            msg: '用户不存在'
          }
        }
      } catch (err) {
        ctx.body = {
          code: -1,
          msg: '登录失败',
          err
        }
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '请输入手机号和密码'
      }
    }
  }
}
