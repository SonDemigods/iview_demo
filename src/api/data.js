import {
  Message
} from 'iview'
import axios from '@/libs/api.request'
// import downloadjs from 'downloadjs'
import qs from 'qs'
import {
  TOKEN_KEY,
  getToken
} from '@/libs/util'
import Cookies from 'js-cookie'
import router from '../router/index'
// error统计
export const saveErrorLogger = info => {
  return axios.request({
    url: 'save_error_logger',
    data: info,
    method: 'post'
  })
}
/**
 * @functionName api
 * @param {String} url 请求地址
 * @param {Object} data 发送数据
 * @param {Object} config 额外参数{contentType:请求头(url|json),showMsg:是否显示提示信息(true|false)}
 * @description ajax封装
 * @author 张航
 * @date 2019-02-01 08:33:13
 * @version V1.0.0
 */
export const api = (url, data, config) => {
  // 发送的数据类型
  const ContentType = {
    url: 'application/x-www-form-urlencoded;charset=utf-8',
    json: 'application/json;charset=utf-8'
  }

  // 初始化额外参数
  config = config || {}
  let _config = {
    method: config.method ? config.method : 'post',
    responseType: config.responseType ? config.responseType : 'json',
    contentType: config.contentType ? config.contentType : 'url',
    showMsg: config.showMsg ? config.showMsg : false
  }

  // 处理发送的数据
  let _data
  let _contentType
  if (_config['contentType'] === 'url') {
    _data = qs.stringify(data, {
      arrayFormat: 'repeat'
    })
    _contentType = ContentType.url
  } else if (_config['contentType'] === 'json') {
    _data = JSON.stringify(data)
    _contentType = ContentType.json
  }
  // 返回ajax方法
  return axios.request({
    url,
    data: _data,
    headers: {
      'Content-Type': _contentType,
      token: getToken() ? getToken() : ''
    },
    method: _config.method,
    responseType: _config.responseType
  }).then(res => {
    // 处理登录超时
    if (res.data.status === 0) {
      localStorage.clear()
      Cookies.remove(TOKEN_KEY)
      Message.error('登录超时!')
      setTimeout(() => {
        router.replace({
          name: 'login'
        })
      }, 1000)
      return false
    }

    if (res.data.status === -1) {
      Message.error(res.data.msg ? res.data.msg : '此操作未授权，请核实！')
    } else if (res.data.status === 20) {
      if (_config['showMsg']) {
        Message.success(res.data.msg ? res.data.msg : '操作成功！')
      }
    } else if (res.data.status === 40) {
      Message.error(res.data.msg ? res.data.msg : '操作失败！')
    } else if (res.data.status === 41) {
      Message.error(res.data.msg ? res.data.msg : '参数错误！')
    } else if (res.data.status === 42) {
      Message.error(res.data.msg ? res.data.msg : '业务逻辑错误！')
    } else if (res.data.status === 50) {
      Message.error(res.data.msg ? res.data.msg : '系统错误！')
    }

    return res.data
  })
}
/**
 * @functionName download
 * @param {String} url 下载路径
 * @param {Object} data 额外参数
 * @param {String} msg 下载失败的消息
 * @description
 * @author 张航
 * @date 2019-03-25 15:08:58
 * @version V1.0.0
 */
export const download = (url, data, msg) => {
  let _mag = msg || '文件下载失败！'
  api(url, data, {
    method: 'get'
  }).then(res => {
    if (status === 20) {
      window.location.href = url
    } else {
      Message.error(res.msg || _mag)
    }
  }).catch(() => {
    Message.error(_mag)
  })
}
/**
 * @functionName exportfile
 * @param {String} url 下载路径
 * @param {Object} data 额外参数
 * @param {String} msg 下载失败的消息
 * @description
 * @author 张航
 * @date 2019-03-25 15:08:58
 * @version V1.0.0
 */
export const exportfile = (url, data, msg) => {
  let _mag = msg || '文件下载失败！'
  api(url, data, {
    method: 'get'
  }).then(res => {
    if (status === 20) {
      window.location.href = url
    } else {
      Message.error(res.msg || _mag)
    }
  }).catch(() => {
    Message.error(_mag)
  })
}
// TODO 单机版数据请求
/**
 * @functionName apiOffline
 * @param {String} url 请求地址
 * @param {Object} data 请求数据
 * @description 单机版数据请求
 * @author 张航
 * @date 2019-07-08 14:07:17
 * @version V1.0.0
 */
export const apiOffline = (url, data) => {

}

// 批量导出
export default {
  api,
  apiOffline
}
