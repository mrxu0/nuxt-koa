import mongoose from 'mongoose'
const Article = mongoose.model('Article')

export const addOrEditArticle = async ({id, title, content }) => {
    console.log(1111111)
    if (id) {
        Article.where({_id: id}).update({
            $set: {
                title: title,
                content: content
            }
        }).exec()
    } else {
        await new Article({ title: title, content: content }).save()
    }
} 