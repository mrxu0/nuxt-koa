import mongoose from 'mongoose'
import Service from '../../libs/controller/Service'

const Article = mongoose.model('Article')

export default class ArticleService extends Service {
    constructor () {
        super(Article)
        this.schema = Article
    }
    async getId ({ _id}) {
        try {
            return await this.schema.findOneAndUpdate({_id: _id}, {$inc: {read: 1} })
        } catch (err) {
            throw new Error('报错了：', err)
        }
    }
}
 