const router = require('koa-router')()
const UserController = require('../controllers/user')

router.prefix('/users')

router.post('/user', UserController.create)
router.get('/user/:id', UserController.detail)

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
