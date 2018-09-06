import axios from 'axios'

const baseUrl = ''

class Services {

  login (user) {
    return axios.post(`${baseUrl}/admin/login`, user)
  }
}

export default new Services()
