import Koa from 'koa'
const app = new Koa()
import views from 'koa-views'
import json from 'koa-json'
import bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'
import cors from 'koa2-cors'
import koaJwt from 'koa-jwt'
import jwt from 'jwt-simple'
import koaStatic from 'koa-static'

import index from './routes/index'
import user from './routes/user'
import tokenConfig from './config/token'

// middlewares
app.use(cors())
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(koaStatic(__dirname + '/public'))
app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

app.use(async (ctx, next) => {
  // origin
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Credentials', 'true')
  await next().then( () => {
    // 请求成功返回200状态码，数据正确性通过body的code区分
    ctx.status = 200
  }).catch( (err) => {
    // token error
    if (err.status === 401) {
      ctx.body = {
        code: -11,
        msg: '未登录'
      }
    } else {
      throw err
    }
  })
})

const widthPath = /^\/api\/user\/(login|register)/

// valid
app.use(koaJwt({secret: tokenConfig.secret}).unless({
  path: [widthPath]
}))

// valid token
app.use(async (ctx, next) => {
  if (!widthPath.test(ctx.url)) {
    const deToken = jwt.decode(ctx.request.header.authorization.replace('Bearer ', ''), tokenConfig.secret)
    const expTime = deToken.exp - new Date().getTime()
    if (expTime < 0) {
      ctx.body = {
        code: -17,
        msg: '登录已失效'
      }
    } else if (expTime < 60 * 60 * 1000) {
      ctx.body = {
        code: -19,
        msg: 'token即将过期，需要刷新',
        exp: expTime
      }
    } else {
      await next()
    }
  } else {
    await next()
  }
})

// routes
app.use(index.routes())
app.use(user.routes())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

export default app
