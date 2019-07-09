<template>
  <div class="top_box">
    <div class="top_logo">
      <slot name="left"></slot>
    </div>
    <Menu ref="topMenu"
          mode="horizontal"
          :theme="theme"
          class="top_menu"
          :accordion="accordion"
          :active-name="activeName"
          @on-select="handleSelect">
      <template v-for="item in menuList">
        <template v-if="item.children && item.children.length === 1">
          <!-- <template v-if="item.children && item.children.length === 0"> -->
          <top-menu-item v-if="showChildren(item)"
                         :key="`menu-${item.name}`"
                         :parent-item="item"></top-menu-item>
          <menu-item v-else
                     :name="getNameOrHref(item, true)"
                     :key="`menu-${item.children[0].name}`">
            <common-icon :type="item.children[0].icon || ''" /><span>{{ showTitle(item.children[0]) }}</span></menu-item>
        </template>
        <template v-else>
          <top-menu-item v-if="showChildren(item)"
                         :key="`menu-${item.name}`"
                         :parent-item="item"></top-menu-item>
          <menu-item v-else
                     :name="getNameOrHref(item)"
                     :key="`menu-${item.name}`">
            <common-icon :type="item.icon || ''" /><span>{{ showTitle(item) }}</span></menu-item>
        </template>
      </template>
    </Menu>
    <div class="top_user">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
import topMenuItem from './top-menu-item.vue'
import { getUnion } from '@/libs/tools'
import mixin from './mixin'
export default {
  name: 'topMenu',
  mixins: [mixin],
  components: {
    topMenuItem
  },
  props: {
    menuList: {
      type: Array,
      default () {
        return []
      }
    },
    collapsed: {
      type: Boolean
    },
    theme: {
      type: String,
      default: 'primary'
    },
    rootIconSize: {
      type: Number,
      default: 20
    },
    iconSize: {
      type: Number,
      default: 16
    },
    accordion: Boolean,
    activeName: {
      type: String,
      default: ''
    },
    openNames: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      openedNames: []
    }
  },
  watch: {
    activeName (name) {
      if (this.accordion) this.openedNames = this.getOpenedNamesByActiveName(name)
      else this.openedNames = getUnion(this.openedNames, this.getOpenedNamesByActiveName(name))
    },
    openNames (newNames) {
      this.openedNames = newNames
    },
    openedNames () {
      this.$nextTick(() => {
        // this.$refs.topMenu.updateOpened()
      })
    }
  },
  computed: {
    textColor () {
      return this.theme === 'dark' ? '#fff' : '#495060'
    }
  },
  methods: {
    handleSelect (name) {
      this.$emit('on-select', name)
    },
    getOpenedNamesByActiveName (name) {
      return this.$route.matched.map(item => item.name).filter(item => item !== name)
    },
    updateOpenName (name) {
      if (name === 'home') this.openedNames = []
      else this.openedNames = this.getOpenedNamesByActiveName(name)
    }
  },
  created () { },
  mounted () {
    this.openedNames = getUnion(this.openedNames, this.getOpenedNamesByActiveName(name))
  }
}
</script>
<style lang="less">
// @import "./top-menu.less";
</style>
