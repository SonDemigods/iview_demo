<template>
  <div>
    <Tooltip content="主题"
             theme="light"
             placement="right">
      <Dropdown trigger="click"
                @on-click="handleClick">
        <Icon type="md-color-palette"
              :size="23"></Icon>
        <DropdownMenu slot="list">
          <DropdownItem v-for="(item, index) in themeList"
                        :key="index"
                        :name="item.key">{{item.value}}</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </Tooltip>
  </div>
</template>

<script>
export default {
  name: 'theme',
  components: {
  },
  props: {},
  data () {
    return {
    }
  },
  watch: {},
  computed: {
    themeList () {
      return this.$config.themeList
    }
  },
  methods: {
    handleClick (name) {
      console.log(name)
      config.theme = name
    }
  },
  created () {
    console.log(this.$config)
  },
  mounted () { }
}
</script>
<style lang="less" scoped>
</style>
