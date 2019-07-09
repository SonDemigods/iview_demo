<template>
  <div class="full-screen-btn-con">
    <Tooltip content="返回平台"
             theme="light"
             placement="bottom">
      <Icon @click.native="handleClick"
            type="md-home"
            :size="23"></Icon>
    </Tooltip>
  </div>
</template>

<script>
const {
  loginUrl,
  onlySystem
} = config
export default {
  name: 'home_btn',
  computed: {
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick () {
      if (onlySystem) {
        this.$router.push({
          name: 'login'
        })
      } else {
        window.location.replace(loginUrl) // 跳转到平台登录
      }
    }
  },
  mounted () {
  }
}
</script>

<style lang="less">
.full-screen-btn-con .ivu-tooltip-rel {
  height: 40px;
  line-height: 40px;
  i {
    cursor: pointer;
  }
}
</style>
