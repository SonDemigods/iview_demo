// eslint-disable-next-line no-unused-vars
const config = (function () {
  var config = {}
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  config.cookieExpires = 1
  /**
   * @description 是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   */
  config.useI18n = false
  /**
   * @description 需要加载的插件
   */
  config.plugin = {
    // 'error-store': {
    //   showInHeader: false, // 设为false后不会在顶部显示错误日志徽标
    //   developmentOff: false // 设为true后在开发环境不会收集错误信息，方便开发中排查错误
    // }
  }
  /**
   * @description 是否网络版
   */
  config.online = true
  /**
   * @description api请求基础路径
   */
  config.baseUrl = {
    dev: 'http://192.168.40.100:9090/authenticate-api',
    pro: 'http://192.168.71.74:8080/authenticate/'
  }
  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  config.homeName = 'home'
  /**
   * @description 当前系统的名称
   */
  config.systemName = 'personalMatters_web'
  /**
   * @description 平台的名称
   */
  config.productName = 'authenticate_web'
  /**
   * @description 平台登录地址
   */
  config.loginUrl = '/' + config.productName + '/login'
  /**
   * @description 主题
   */
  config.theme = ''
  /**
   * @description 主题列表
   */
  config.themeList = [{
    key: '',
    value: '科技蓝'
  },
  {
    key: 'green',
    value: '清新绿'
  }
  ]
  /**
   * @description 字号列表
   */
  config.sizeList = [{
    key: '100',
    value: '1X'
  },
  {
    key: '120',
    value: '1.2X'
  },
  {
    key: '140',
    value: '1.4X'
  }
  ]
  return config
}())
