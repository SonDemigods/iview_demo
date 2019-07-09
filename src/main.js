// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import iviewArea from 'iview-area'
import i18n from '@/locale'
import config from '@/config'
import importDirective from '@/directive'
import installPlugin from '@/plugin'
import {
  checkAuth
} from '@/libs/util'
import 'iview/dist/styles/iview.css'
// import './index.less'
import '@/assets/icons/ant/iconfont.css'
import '@/assets/icons/rookie/iconfont.css'
import TreeTable from 'tree-table-vue'
import Steps from '_c/steps'
import {
  api,
  apiOffline,
  download
} from '@/api/data.js'
// 引入主题文件
switch (config.theme) {
  case 'green':
    require('@/assets/theme/green.less')
    break
  default:
    require('@/assets/theme/default.less')
    break
}

// 实际打包时应该不引入mock
/* eslint-disable */
if (process.env.NODE_ENV !== 'production') require('@/mock')

// 加载支持click方法的进度组件
iView.Step = Steps.Step
iView.Steps = Steps

// 使用国际化组件
Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
})
// 使用area组件
Vue.use(iviewArea)

// 使用treeTable组件
Vue.use(TreeTable)

/**
 * @description 注册admin内置插件
 */

installPlugin(Vue)
/**
 * @description 生产环境关掉提示
 */

Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */

Vue.prototype.$config = config

/**
 * @description 全局注册ajax方法
 */

// TODO 根据版本绑定不同的请求方法
Vue.prototype.$api = config.online ? api : apiOffline
/**
 * @description 全局注册baseUrl
 */
Vue.prototype.$baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
/**
 * @description 全局注册文件下载方法
 */
Vue.prototype.$download = download
/**
 * @description 全局注册检测按钮权限方法
 */
Vue.prototype.$checkAuth = checkAuth

/**
 * 注册指令
 */
importDirective(Vue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
