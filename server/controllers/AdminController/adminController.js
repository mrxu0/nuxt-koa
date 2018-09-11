import { controller, get, post, required, log } from '../../decorator/controller'
import AdminService from './adminService'

const adminService = new AdminService()

@controller('admin')
export class Admin {
    @post('login')
    @log
    @required({ body: ['email', 'password'] })
  async login(ctx, next) {
    const { email, password } = ctx.request.body
    const user = await adminService.login(email, password)
    if (user) {
      ctx.session.user = {
        _id: user._id,
        role: user.role,
        email: user.email,
        name: user.name
      }
      ctx.body = {
        success: true,
        data: {
          _id: user._id,
          email: user.email,
          name: user.name,
          gender: user.gender
        },
        msg: 'ok'
      }
      return
    }
    ctx.body = {
      success: false,
      data: {},
      msg: '用户名或密码错误'
    }
  }

    @get('logout')
  async logout(ctx, next) {
    ctx.session = null
    ctx.body = {
      success: true,
      data: {}
    }
  }
}
