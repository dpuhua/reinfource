import UserController from '../controllers/user/user'
import Router from 'koa-router'

const router = new Router()

router.prefix('/user')

router.get('/getUserById/:id', UserController.detail)
router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.get('/', (ctx, next) => {
  ctx.body = 'this is a user response!'
})

router.get('/bar', (ctx, next) => {
  ctx.body = 'this is a user/bar response'
})

export default router
