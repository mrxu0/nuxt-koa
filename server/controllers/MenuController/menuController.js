import { controller, get, post, required, log } from '../../decorator/controller'
import mongoose from 'mongoose'

const Menu = mongoose.model('menu')

@controller('menu')
export class MenuCtroller {
    @get('/list')
    @log
    async list(ctx, next) {
        const res = await Menu.getList()
        ctx.body = {
            success: true,
            msg: 'ok'
        }
    }

}