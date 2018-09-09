import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8088';

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
  async addOrEditArticle ( { commit }, params ) {
    try {
       let res = await axios.post('/article/addOrEdit', params)
       let { data } = res
       return data
      
    } catch (e) {
      throw new Error(e)
    }
  },

  // 获得文章
  async getArticle ( { commit }, { _id }) {
    console.log('getArticle', _id)
    try {
      let res = await axios.get('/article/get/' + _id)
      let { data } = res
      return data
    } catch (e) {
      throw new Error(e)
    }
  },

  // 编辑文章
  async editArticle ( { commit }, { title, content, _id }) {
    try {
      let res = await axios.post('/article/addOrEdit', {
        _id,
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
      // console.log('res', res)
      let { data } = res
      return data
    } catch (e) {
      throw new Error('报错了', e)
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
