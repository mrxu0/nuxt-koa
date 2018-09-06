import { controller, get, post, required, log } from '../../decorator/controller'
import mongoose from 'mongoose'

const User = mongoose.model('Users')

@controller('admin')
export class Admin {
    @post('login')
    @log
    @required({ body: ['email', 'password'] })
    async login(ctx, next) {
        const { email, password } = ctx.request.body
        try {
            var user = await User.findOne({ email: email }).exec()
            var match = null
            if (user) match = await user.comparePassword(password, user.password)
        } catch (e) {
            throw new Error(e)
        }
        if (match) {
            ctx.session.user = {
                _id: user._id,
                role: user.role,
                email: user.email,
                name: user.name
            }

            return ctx.body = {
                success: true,
                data: {
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                    gender: user.gender
                },
                msg: 'ok'
            }
        }

        return ctx.body = {
            success: false,
            data: {},
            msg: '用户名或密码错误'
        }
    }

    @get('logout')
    async logout(ctx, next) {
        ctx.session = null
        return ctx.body = {
            success: true,
            data: {}
        }
    }

}