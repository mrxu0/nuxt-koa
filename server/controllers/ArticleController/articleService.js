import mongoose from 'mongoose'
import Service from '../../libs/controller/Service'

const Article = mongoose.model('Article')

export default class ArticleService extends Service {
    constructor () {
        super(Article)
    }
}
 