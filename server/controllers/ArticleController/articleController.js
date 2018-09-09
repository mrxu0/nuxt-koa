import { controller, get, post, required, log } from '../../decorator/controller'
import ArticleService from './articleService'

const articleService = new ArticleService()

@controller('article')
export class ArticleController {
    @post('addOrEdit')
    @log
    @required({ body: ['title', 'content'] })
    async addOrEdit(ctx, next) {
        await articleService.aore(ctx.request.body)
        return ctx.body = {
            success: true,
            data: {},
            msg: '添加成功'
        }
    }

    @get('get/:_id')
    @log
    async get(ctx, next) {
        let data = []
        data = await articleService.getId(ctx.params)
        if (data.length <= 0) return ctx.body= {
            success: false,
            data: {},
            msg: '请不要自己造链接哦!'
        }
        return ctx.body = {
            success: true,
            data: data,
            msg: '获取成功'
        }
    }

    @get('list')
    @log
    async list(ctx, next) {
        let list = null
        list = await articleService.list()
        return ctx.body = {
            success: true,
            data: list,
        }
    }

    @get('del/:_id')
    @log
    async del(ctx, next) {
        await articleService.del(ctx.params)
        return ctx.body = {
            success: true,
            data: {},
            msg: '删除成功'
        }
    }
}