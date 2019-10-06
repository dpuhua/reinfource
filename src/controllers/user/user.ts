import { user } from '../../db/test'
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
  static async create(ctx: any) {
    const req = ctx.request.body
    if (req.nickName && req.mobile && req.password) {
      try {
        console.log(11111111111111111111111)

        const ret = await user.createItem(req)
        
        console.log(22222222222222222222)
        
        const data = await user.getById(ret.rid)
        ctx.response.status = 200
        ctx.body = {
          code: 1,
          msg: '创建成功',
          data
        }
      } catch (err) {
        console.log(err);
        
        ctx.response.status = 412
        ctx.body = {
          code: -1,
          msg: '创建失败',
          data: err
        }
      }
    } else {
      ctx.response.status = 416
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
        ctx.response.status = 200
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
        ctx.response.status = 412
        ctx.body = {
          code: -1,
          msg: '查询失败',
          err
        }
      }
    } else {
      ctx.response.status = 416
      ctx.body = {
        code: -1,
        msg: 'id不能为空'
      }
    }
  }

  static async register(ctx: any) {
    const req = ctx.request.body
    console.log(req);
    
    if (req.mobile && req.nickName && req.password) {
      let data = await user.getByMobile(req.mobile)
      if (data) {
        ctx.response.static = 416
        ctx.body = {
          code: -1,
          msg: '手机号已存在'
        }
      } else {
        data = await user.getByNickName(req.nickName)
        if (data) {
          ctx.response.static = 416
          ctx.body = {
            code: -1,
            msg: '用户名已存在'
          }
        } else {
          UserController.create(ctx)
        }
      }

    } else {
      ctx.response.static = 416
      ctx.body = {
        code: -1,
        msg: '手机号、用户名、密码不能为空'
      }
    }
    
  }

  static async login(ctx: any) {
    const req = ctx.request.body
    if (req.mobile && req.password) {
      const data = await user.getByMobile(req.mobile)
      const token = getToken(data.nickName)
      ctx.response.status = 200
      ctx.body = {
        code: 1,
        msg: '查询成功',
        token,
        data
      }
    } else {
      ctx.response.status = 416
      ctx.body = {
        code: -1,
        msg: '请输入手机号和密码'
      }
    }
  }
}