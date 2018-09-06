import { controller, get, post, required, log } from '../../decorator/controller'
import mongoose from 'mongoose'
const Article = mongoose.model('Article')
import * as AS from './articleService'

@controller('article')
export class Admin {
    @post('addOrEdit')
    @log
    @required({ body: ['title', 'content'] })
    async add(ctx, next) {
        try {
            AS.addOrEditArticle(ctx.request.body)
        } catch (e) {
            throw new Error(e)
        }
        return ctx.body = {
            success: true,
            data: {},
            msg: '添加成功'
        }
    }

    @get('get/:id')
    @log
    async get(ctx, next) {
        const { id } = ctx.params
        let data = []
        try {
            data = await Article.find({_id: id})
            if (data.length <= 0) return ctx.body= {
                success: false,
                data: {},
                msg: '请不要自己造链接哦!'
            }
        } catch (e) {
            throw new Error(e)
        }
        return ctx.body = {
            success: true,
            data: data,
            msg: '获取成功'
        }
    }

    /* @post('edit')
    @log
    @required({ body: ['title', 'content', 'id'] })
    async edit(ctx, next) {
        try {
            AS.addOrEditArticle(ctx.request.body)
        } catch (e) {
            throw new Error(e)
        }
        return ctx.body = {
            success: true,
            data: {},
            msg: '修改成功'
        }
    } */

    @get('list')
    @log
    async list(ctx, next) {
        let list = null
        try {
            list = await Article.find()
        } catch (e) {
            throw new Error(e)
        }

        return ctx.body = {
            success: true,
            data: list,
        }
    }

    @get('del/:_id')
    @log
    async del(ctx, next) {
        const { _id } = ctx.params
        try {
            await Article.deleteOne({_id: _id})
        } catch (e) {
            throw new Error(e)
        }

        return ctx.body = {
            success: true,
            data: {},
            msg: '删除成功'
        }
    }
}