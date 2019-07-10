<template>
  <Layout style="height: 100%"
          class="main">
    <Header class="header-menu"
            style="padding:0;">
      <!-- 头部菜单 -->
      <top-menu ref="topMenu"
                theme="primary"
                :menu-list="menuList"
                :active-name="$route.name"
                @on-select="turnToPage">
        <div slot="left"
             class="header-logo"
             @click="toHome">
          <img src="../../assets/images/logo.png"
               style="height:24px;display:inline-block;margin:8px;vertical-align: top;" />
          <span style="font-size: 18px;color: white;">iview_demo</span>
        </div>
        <div slot="right">
          <user :user-avator="userAvator"
                style="float: right;color: #fff;" />
          <!-- <language v-if="$config.useI18n"
                                  @on-lang-change="setLocal"
                                  style="margin-right: 10px;"
                                  :lang="local" /> -->
          <!-- <error-store v-if="$config.plugin['error-store'] && $config.plugin['error-store'].showInHeader"
                         :has-read="hasReadErrorPage"
                         :count="errorCount"></error-store> -->
          <themeBtn style="margin-right: 10px;float:right;color: #fff;"></themeBtn>
          <fontSizeBtn style="margin-right: 10px;float:right;color: #fff;"></fontSizeBtn>
          <fullscreen v-model="isFullscreen"
                      style="margin-right: 10px;float:right;color: #fff;" />
          <!-- 返回首页按钮 -->
          <!-- <homeBth style="margin-right: 10px;float:right;color: #fff;"></homeBth> -->
        </div>
      </top-menu>
      <!-- 头部菜单 -->
    </Header>
    <Layout>
      <!-- 左侧菜单 -->
      <!-- <Sider hide-trigger
             collapsible
             :width="200"
             :collapsed-width="64"
             v-model="collapsed"
             class="left-sider"
             :style="{overflow: 'hidden'}">
        <side-menu ref="sideMenu"
                   :menu-list="menuList"
                   :accordion="true"
                   :open-names="openMenuName"
                   :active-name="$route.name"
                   :theme="themeType"
                   :collapsed="collapsed"
                   @on-select="turnToPage"
                   @on-open-change="openMenu">
          <div class="logo-con">
            <img :src="logo" />
            <span v-show="!collapsed"
                  style="font-size:14px;">干部监督信息管理平台</span>
          </div>
        </side-menu>
      </Sider> -->
      <!-- 左侧菜单 -->
      <Layout>
        <!-- 面包屑 -->
        <!-- <Header class="header-con"
                style="height:40px !important;line-height:40px !important;">
          <header-bar :collapsed="collapsed"
                      @on-coll-change="handleCollapsedChange">
            <user :user-avator="userAvator" />
            <language v-if="$config.useI18n"
                      @on-lang-change="setLocal"
                      style="margin-right: 10px;"
                      :lang="local" />
            <error-store v-if="$config.plugin['error-store'] && $config.plugin['error-store'].showInHeader"
                         :has-read="hasReadErrorPage"
                         :count="errorCount"></error-store>
            <fullscreen v-model="isFullscreen"
                        style="margin-right: 10px;" />
          </header-bar>
        </Header> -->
        <!-- 面包屑 -->
        <Content class="main-content-con">
          <Layout class="main-layout-con">
            <div class="tag-nav-wrapper">
              <tags-nav :value="$route"
                        @input="handleClick"
                        :list="tagNavList"
                        @on-close="handleCloseTag" />
            </div>
            <Content class="content-wrapper">
              <Card class="right-card">
                <keep-alive :include="cacheList">
                  <router-view />
                </keep-alive>
              </Card>
            </Content>
          </Layout>
        </Content>
      </Layout>
    </Layout>
    <Footer style="background:#2b85e4;font-size:0.14rem;">单位：{{ unitName }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;用户：{{ userName }}</Footer>
  </Layout>
</template>
<script>
import logo from '@/assets/images/logo.png'
import SideMenu from './components/side-menu'
import topMenu from './components/top-menu'
import HeaderBar from './components/header-bar'
import TagsNav from './components/tags-nav'
import User from './components/user'
import homeBth from './components/home'
import Fullscreen from './components/fullscreen'
import themeBtn from './components/theme'
import fontSizeBtn from './components/fontSize'
import Language from './components/language'
// import ErrorStore from './components/error-store'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import { getNewTagList, getNextRoute, routeEqual } from '@/libs/util'
import './main.less'

export default {
  name: 'Main',
  components: {
    SideMenu,
    topMenu,
    HeaderBar,
    Language,
    TagsNav,
    homeBth,
    Fullscreen,
    themeBtn,
    fontSizeBtn,
    // ErrorStore,
    User
  },
  data () {
    return {
      logo: logo,
      collapsed: false,
      isFullscreen: false,
      themeType: 'dark',
      openMenuName: []
    }
  },
  computed: {
    ...mapGetters([
      'errorCount'
    ]),
    tagNavList () {
      return this.$store.state.app.tagNavList
    },
    tagRouter () {
      return this.$store.state.app.tagRouter
    },
    userAvator () {
      return this.$store.state.user.avatorImgPath
    },
    userName () {
      return this.$store.state.user.userName
    },
    unitName () {
      return this.$store.state.user.unitName
    },
    cacheList () {
      return this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []
    },
    menuList () {
      return this.$store.getters.menuList
    },
    local () {
      return this.$store.state.app.local
    },
    hasReadErrorPage () {
      return this.$store.state.app.hasReadErrorPage
    }
  },
  created () {
  },
  methods: {
    ...mapMutations([
      'setBreadCrumb',
      'setTagNavList',
      'addTag',
      'setLocal'
    ]),
    ...mapActions([
      'handleLogin'
    ]),
    turnToPage (route) {
      let { name, params, query } = {}
      if (typeof route === 'string') name = route
      else {
        name = route.name
        params = route.params
        query = route.query
      }
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1])
        return
      }
      this.$router.push({
        name,
        params,
        query
      })
    },
    openMenu (list) {
      this.openMenuName = list
    },
    toHome () {
      this.$router.push('/home')
    },
    handleCollapsedChange (state) {
      this.collapsed = state
    },
    handleCloseTag (res, type, route) {
      if (type === 'all') {
        this.turnToPage('home')
      } else if (routeEqual(this.$route, route)) {
        if (type === 'others') {
        } else {
          const nextRoute = getNextRoute(this.tagNavList, route)
          this.$router.push(nextRoute)
        }
      }
      this.setTagNavList(res)
    },
    handleClick (item) {
      this.turnToPage(item)
    },
    quit () {
      this.$Modal.confirm({
        title: '确认',
        content: '<p>是否退出系统？</p>',
        onOk: () => {
          window.close()
        },
        onCancel: () => {
        }
      })
    }
  },
  watch: {
    '$route' (newRoute) {
      const { name, query, params, meta } = newRoute
      this.addTag({
        route: { name, query, params, meta },
        type: 'push'
      })
      this.setBreadCrumb(newRoute)
      this.setTagNavList(getNewTagList(this.tagNavList, newRoute))
      // this.$refs.sideMenu.updateOpenName(newRoute.name)
      this.$refs.topMenu.updateOpenName(newRoute.name)
    }
  },
  mounted () {
    /**
     * @description 初始化设置面包屑导航和标签导航
     */
    this.setTagNavList()
    this.addTag({
      route: this.$store.state.app.homeRoute
    })
    this.setBreadCrumb(this.$route)
    // 设置初始语言
    this.setLocal(this.$i18n.locale)
    // 如果当前打开页面不在标签栏中，跳到homeName页
    if (!this.tagNavList.find(item => item.name === this.$route.name)) {
      this.$router.push({
        name: this.$config.homeName
      })
    }
  }
}
</script>
<style lang="less">
/deep/ .ivu-card-body {
  height: 100%;
}
</style>
