import Koa from 'koa'
const app = new Koa()
import views from 'koa-views'
import json from 'koa-json'
import bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'
import cors from 'koa-cors'
import koaJwt from 'koa-jwt'
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

// logger
app.use(async (ctx, next) => {
  await next()
})

// valid
app.use(koaJwt({secret: tokenConfig.secret}).unless({
  path: [/^\/user\/(login|register)/]
}))

// routes
// app.use(index.routes(), index.allowedMethods())
// app.use(user.routes(), user.allowedMethods())
app.use(index.routes())
app.use(user.routes())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

export default app
