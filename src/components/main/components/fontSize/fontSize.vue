<template>
  <div>
    <Tooltip content="字号"
             theme="light"
             placement="right">
      <Dropdown trigger="click"
                @on-click="handleClick">
        <Icon type="md-quote"
              :size="23"></Icon>
        <DropdownMenu slot="list">
          <DropdownItem v-for="(item, index) in sizeList"
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
    sizeList () {
      return this.$config.sizeList
    }
  },
  methods: {
    handleClick (name) {
      console.log(name)
      let size = name + 'px'
      document.getElementById('html').style.fontSize = size
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
