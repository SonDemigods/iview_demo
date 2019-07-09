import config from '@/config'
import apiData from '@/api/data'
import {
  setToken,
  getToken
} from '@/libs/util'

let api
if (config.online) {
  api = apiData.api
} else {
  api = apiData.apiOffline
}

export default {
  state: {
    userName: localStorage.getItem('userName') ? localStorage.getItem('userName') : '',
    uname: localStorage.getItem('uname') ? localStorage.getItem('uname') : '',
    password: localStorage.getItem('password') ? localStorage.getItem('password') : '',
    userId: localStorage.getItem('userid') ? localStorage.getItem('userid') : '',
    avatorImgPath: localStorage.getItem('userpic') ? localStorage.getItem('userpic') : '',
    token: getToken(),
    access: localStorage.getItem('access') ? localStorage.getItem('access').split(',') : [],
    unitId: localStorage.getItem('unitid') ? localStorage.getItem('unitid') : '',
    unitName: localStorage.getItem('unitName') ? localStorage.getItem('unitName') : '',
    hasGetInfo: localStorage.getItem('hasGetInfo') === 'true',
    resources: localStorage.getItem('resources') ? localStorage.getItem('resources') : '',
    systemName: localStorage.getItem('systemName') ? localStorage.getItem('systemName') : '',
    systemAuthList: localStorage.getItem('systemAuthList') ? JSON.parse(localStorage.getItem('systemAuthList')) : '',
    isAdmin: localStorage.getItem('isAdmin') ? localStorage.getItem('isAdmin') : '',
    enCodeUser: localStorage.getItem('enCodeUser') ? localStorage.getItem('enCodeUser') : ''
  },
  mutations: {
    setAvator (state, avatorPath) {
      localStorage.setItem('userpic', avatorPath)
      state.avatorImgPath = avatorPath
    },
    setUserId (state, id) {
      localStorage.setItem('userid', id)
      state.userId = id
    },
    setUserName (state, name) {
      localStorage.setItem('userName', name)
      state.userName = name
    },
    setuname (state, uname) {
      localStorage.setItem('uname', uname)
      state.uname = uname
    },
    setPassword (state, password) {
      localStorage.setItem('password', password)
      state.password = password
    },
    setAccess (state, access) {
      let arr = access && access.length > 0 ? access.join(',') : ''
      localStorage.setItem('access', arr)
      state.access = access
    },
    setUnitId (state, id) {
      localStorage.setItem('unitid', id)
      state.unitId = id
    },
    setUnitName (state, name) {
      localStorage.setItem('unitName', name)
      state.unitName = name
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setHasGetInfo (state, status) {
      localStorage.setItem('hasGetInfo', status)
      state.hasGetInfo = status
    },
    setSystemName (state, data) {
      localStorage.setItem('systemName', data)
      state.systemName = data
    },
    setSystemAuthList (state, data) {
      localStorage.setItem('systemAuthList', JSON.stringify(data))
      state.systemAuthList = data
    },
    setIsAdmin (state, data) {
      localStorage.setItem('isAdmin', data)
      state.isAdmin = data
    },
    setEnCodeUser (state, data) {
      localStorage.setItem('enCodeUser', data)
      state.enCodeUser = data
    }
  },
  actions: {
    // 登录
    handleLogin ({
      commit
    }, {
      username,
      password
    }) {
      username = username.trim()
      password = password.trim()
      return new Promise((resolve, reject) => {
        api('login', {
          username,
          password
        }).then(res => {
          if (res.status === 20) {
            localStorage.clear()
            const data = res.data
            commit('setToken', data.token)
            commit('setAvator', 'admin')
            commit('setUserName', data.showname)
            commit('setuname', username)
            commit('setPassword', password)
            commit('setUserId', data.userId)
            commit('setAccess', data.resourceList)
            commit('setHasGetInfo', true)
            commit('setUnitId', data.orgId)
            commit('setUnitName', data.orgName)
            commit('setSystemName', config.systemName)
            commit('setSystemAuthList', data.systemAuthList)
            commit('setIsAdmin', data.isAdmin)
            commit('setEnCodeUser', data.enCodeUser)
            resolve(data)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取token信息
    getTokenInfo ({
      commit
    }, token) {
      return new Promise((resolve, reject) => {
        api('API/getLoginUser', {
          token
        }).then(res => {
          if (res.status === 20) {
            localStorage.clear()
            const data = res.data
            commit('setToken', data.token)
            commit('setAvator', 'admin')
            commit('setUserName', data.showname)
            commit('setUserId', data.userId)
            commit('setAccess', data.resourceList)
            commit('setHasGetInfo', true)
            commit('setUnitId', data.orgId)
            commit('setUnitName', data.orgName)
            commit('setSystemName', config.systemName)
            commit('setSystemAuthList', data.systemAuthList)
            commit('setIsAdmin', data.isAdmin)
            commit('setEnCodeUser', data.enCodeUser)
            resolve(data)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({
      state,
      commit
    }) {
      return new Promise((resolve, reject) => {
        // logout(state.token).then(() => {
        //   commit('setToken', '')
        //   commit('setAccess', [])
        //   localStorage.removeItem('resources')
        //   resolve()
        // }).catch(err => {
        //   reject(err)
        // })
        api('logout', {
          token: state.token
        }).then(res => {
          if (res.status === 20) {
            commit('setToken', '')
            commit('setAccess', [])
            localStorage.clear()
            resolve()
          }
        }).catch(err => {
          reject(err)
        })
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        // commit('setToken', '')
        // commit('setAccess', [])
        // resolve()
      })
    },
    // 获取用户相关信息
    getUserInfo ({
      state,
      commit
    }) {
      return localStorage.getItem('access') ? localStorage.getItem('access').split(',') : []
      // return new Promise((resolve, reject) => {
      //   try {
      //     getUserInfo(state.token).then(res => {
      //       const data = res.data
      //       commit('setAvator', data.avator)
      //       commit('setUserName', data.name)
      //       commit('setUserId', data.user_id)
      //       commit('setAccess', data.access)
      //       commit('setHasGetInfo', true)
      //       resolve(data)
      //     }).catch(err => {
      //       reject(err)
      //     })
      //   } catch (error) {
      //     reject(error)
      //   }
      // })
    }
  }
}
