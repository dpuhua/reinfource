const router = require('koa-router')()
const UserController = require('../controllers/user/user')

router.prefix('/user')

router.get('/getUserById/:id', UserController.detail)
router.post('/register', UserController.create)
router.post('/login', UserController.login)

router.get('/', function (ctx, next) {
  ctx.body = 'this is a user response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a user/bar response'
})

module.exports = router
