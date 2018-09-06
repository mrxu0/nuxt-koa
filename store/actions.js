import Services from './services'
import axios from 'axios'
export default {
  async getMenu () {
    let res = await axios.get('/menu/list')
  },
  nuxtServerInit ({ commit }, { req }) {
    if (req.session && req.session.user) {
      const { email, nickname, avatarUrl } = req.session.user
      const user = {
        email,
        nickname,
        avatarUrl
      }

      commit('SET_USER', user)
    }
  },
  // 登陆
  async login ({ commit }, { email, password }) {
    try {
      let res = await axios.post('/admin/login', {
        email,
        password
      })
      let { data } = res
      if (data.success) {
        commit('SET_USER', data.data)
      }

      return data
    } catch (e) {
      throw new Error(e)
    }
  },
  // 登出
  async logout ({ commit }) {
    try {
      let res = await axios.get('/admin/logout')
      let { data } = res
      if (data.success) {
        commit('SET_USER', null)
      }
      return data
    } catch (e) {
      throw new Error(e)
    }
  },

  // 添加文章
  async addOrEditArticle ( { commit }, data ) {
    try {
      console.log(data)
      let res = await axios.post('/article/addOrEdit', data)
      let { data } = res
      return data
      
    } catch (e) {
      throw new Error(e)
    }
  },

  // 获得文章
  async getArticle ( { commit }, { id }) {
    try {
      let res = await axios.get('/article/get/' + id)
      let { data } = res
      return data
    } catch (e) {
      throw new Error(e)
    }
  },

  // 编辑文章
  async editArticle ( { commit }, { title, content, id }) {
    try {
      let res = await axios.post('/article/addOrEdit', {
        id,
        title,
        content
      })
      let { data } = res
      return data
      
    } catch (e) {
      throw new Error(e)
    }
  },

  // 文章列表
  async articleList () {
    try {
      let res = await axios.get('/article/list')
      let { data } = res
      return data
    } catch (e) {
      throw new Error(e)
    }
  },

  // 删除文章
  async delArticle ({commit}, {_id}) {
    try {
      let res = await axios.get(`/article/del/${_id}`)
      let { data } = res
      return data
    } catch (e) {
      throw new Error(e)
    }
  },
}
