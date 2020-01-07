import Koa from 'koa'
const app = new Koa()
import views from 'koa-views' // 可以通过ctx.render进行视图模板渲染
import json from 'koa-json' // 支持post相应json格式的中间件
import bodyparser from 'koa-bodyparser' // 处理post请求
import logger from 'koa-logger' // 输出请求日志，此处只是在控制台打印的
import cors from 'koa2-cors' // 跨域设置
import koaJwt from 'koa-jwt' // Json Web Tokens 用于token认证
import jwt from 'jwt-simple' // 用于操作jwt产生的token，列如间token中的信息提取
import koaStatic from 'koa-static' // 加载本地文件
import http from 'http'
import sequelize from '~/db/test' // test数据库
import * as models from '~/db/test_table' // 模型，test数据库下的表

import * as routers from './routes' // 路由
import tokenConfig from './config/token' // token配置

// sequelize添加模型
sequelize.addModels(Object.values(models))

// middlewares
// app.use(cors()) // 此处跨域有问题，应该传入参数，不应该在下面直接设置响应头
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))

app.use(async (ctx, next) => {
  // origin
  ctx.set('Access-Control-Allow-Origin', 'http://192.168.1.113:8080')
  ctx.set('Access-Control-Allow-Credentials', 'true')
  ctx.set('Access-Control-Allow-Headers', 'content-type')
  await next().then( () => {
    if (ctx.status === 404) {
      ctx.body = {
        code: -1,
        msg: '接口不存在'
      }
    }
    // 请求成功返回200状态码，数据正确性通过body的code区分
    ctx.status = 200
  })
})

app.use((ctx) => {
  const value = 'CfDJ8CQSBq%2FaqPBJhcIm3xawvCmOct57LhkoPiTeDA%2FiLLqhNTukXLu0HAcSeqRt%2BJ9QSLJ21Cs7J5ZmURsNZW93rAeLy%2Bk%2Bi9bi2DyUW7t9ojn0WdC4ICvKfhPFHCc%2BjlcoVoxen305CLMBQwuoMntswLl96T70Gp2yeqVrJw01GRca'
  ctx.cookies.set('.AspNetCore.Session', value, {
    path: '/'         // cookie保存路径, 默认是'/，set时更改，get时同时修改，不然会保存不上，服务同时也获取不到
  })
})

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

const server = http.createServer(app.callback());

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(process.env.port);
