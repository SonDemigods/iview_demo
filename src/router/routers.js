/**
 * @description 路由配置
 * @author 张航
 * @date 2019-02-01 09:01:06
 * @version V1.0.0
 */
import Main from '@/components/main'
// import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [{
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录',
    hideInMenu: true
  },
  component: () => import('@/view/common/login')
},
{
  path: '/',
  name: '_home',
  redirect: '/home',
  component: Main,
  meta: {
    hideInMenu: true,
    notCache: true
  },
  children: [{
    path: '/home',
    name: 'home',
    meta: {
      hideInMenu: true,
      title: '首页',
      notCache: true,
      icon: 'md-home'
    },
    component: () => import('@/view/common/home')
  }]
},
{
  path: 'list',
  name: '_list',
  component: Main,
  meta: {
    notCache: true,
    title: '列表'
  },
  children: [{
    path: '/list',
    name: 'list',
    meta: {
      title: '列表',
      notCache: true,
      icon: 'md-list'
    },
    component: () => import('@/view/biz/list')
  }]
},
{
  path: '/error_logger',
  name: 'error_logger',
  meta: {
    hide: true,
    hideInMenu: true
  },
  component: Main,
  children: [{
    path: 'error_logger_page',
    name: 'error_logger_page',
    meta: {
      icon: 'ios-bug',
      title: '错误日志'
    },
    component: () => import('@/view/common/error-logger.vue')
  }]
},
{
  path: '/401',
  name: 'error_401',
  meta: {
    hideInMenu: true
  },
  component: () => import('@/view/common/error-page/401.vue')
},
{
  path: '/500',
  name: 'error_500',
  meta: {
    hideInMenu: true
  },
  component: () => import('@/view/common/error-page/500.vue')
},
{
  path: '*',
  name: 'error_404',
  meta: {
    hideInMenu: true
  },
  component: () => import('@/view/common/error-page/404.vue')
}
]
