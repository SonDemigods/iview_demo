<!--
 * @description 渲染树结构数据的表格
 * @author 李昱
!-->
<template>
  <div class="i-tree-table">
    <div class="tool-box">
      <slot name="tool"></slot>
    </div>
    <Table :height="height"
           :loading="loading"
           border
           :columns="innerColumns"
           :data="tableData">
      <slot name="header"
            slot="header"></slot>
      <slot name="footer"
            slot="footer"></slot>
      <slot name="loading"
            slot="loading"></slot>
    </Table>
    <div class="page-box">
      <slot name="page"></slot>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    height: {
      type: [Number, String],
      default: 'auto'
    },
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    controlKey: {
      type: String,
      default: ''
    },
    defaultClose: {
      type: Boolean,
      default: false
    },
    childrenKey: {
      type: String,
      default: 'children'
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      original_treeData: [],
      tableData: [],
      hiddenKeyARR: [] // 需要收起的row的索引集合
    }
  },
  methods: {
    // 控制展开状态的列的render函数
    col_render (h, {
      row,
      column,
      index
    }) {
      let vm = this
      let spaceVDOM = h('span', {
        class: 'space'
      })
      let lineVDOM = h('span', {
        class: 'line'
      }, '├─')
      let openVDOM = h('Button', {
        class: ['control-btn', 'open-btn'],
        props: {
          icon: 'md-add',
          size: 'small',
          type: 'primary'
        },
        on: {
          click: function () {
            vm.toggle(row, 'open')
          }
        }
      })
      let closeVDOM = h('Button', {
        class: ['control-btn', 'close-btn'],
        props: {
          icon: 'md-remove',
          size: 'small',
          type: 'primary',
          ghost: true
        },
        on: {
          click: function () {
            vm.toggle(row, 'close')
          }
        }
      })
      let VDOM_ARR = []
      for (let i = 0; i < row._level_; i++) {
        VDOM_ARR.push(spaceVDOM)
      }
      // 如果有子集，则在前面加入控制按钮
      if (row[this.childrenKey] && row[this.childrenKey].length > 0) {
        if (row._state_ === 'close') {
          VDOM_ARR[VDOM_ARR.length - 1] = openVDOM
        } else {
          VDOM_ARR[VDOM_ARR.length - 1] = closeVDOM
        }
      } else if (row._parent_.length > 0) {
        // 如果没有子集，但是有父级，则在前面加竖线
        VDOM_ARR[VDOM_ARR.length - 1] = lineVDOM
      }
      VDOM_ARR.push(h('span', { class: 'control-col' }, row[column.key]))
      return h('div', { class: 'control-cell' }, VDOM_ARR)
    },
    // 把原始数据转成表格数据
    transformTableData (tree) {
      let tableData = []
      let formatTable = (dataARR, level = 0, parentItem = null) => {
        level = level + 1
        dataARR.map(item => {
          var row = { ...item, _level_: level }
          if (
            parentItem &&
            this.isArray(parentItem._parent_)
          ) {
            let parent = this.deepClone(parentItem._parent_)
            parent.push(parentItem._key_)
            row._parent_ = parent
          } else {
            row._parent_ = []
          }
          tableData.push(row)
          if (item[this.childrenKey] && item[this.childrenKey].length > 0 && item._state_ !== 'close') {
            formatTable(item[this.childrenKey], level, row)
          }
        })
      }
      formatTable(tree)
      return tableData
    },
    // 给原始数据打唯一标识
    markData (data) {
      let i = 0
      let marking = data => {
        return data.map(item => {
          i++
          if (item[this.childrenKey] && item[this.childrenKey].length > 0) {
            return { ...item, _key_: i, [this.childrenKey]: marking(item[this.childrenKey]) }
          }
          return { ...item, _key_: i }
        })
      }
      return marking(data)
    },
    // 切换展开折叠状态
    toggle (row, action) {
      if (action === 'open') {
        this.setOriginalRowState(this.original_treeData, row._key_, 'open')
        this.tableData = this.transformTableData(this.deepClone(this.original_treeData))
      } else {
        this.setOriginalRowState(this.original_treeData, row._key_, 'close')
        this.tableData = this.transformTableData(this.deepClone(this.original_treeData))
      }
    },
    // 根据唯一标识_key_, 在原始数据中标记展开状态
    setOriginalRowState (data, key, state) {
      data.forEach(item => {
        if (item._key_ === key) {
          item._state_ = state
        }
        if (item[this.childrenKey] && item[this.childrenKey].length > 0) {
          this.setOriginalRowState(item[this.childrenKey], key, state)
        }
      })
    },
    // 设置默认的状态
    setDefaultCloseState (data) {
      data.forEach(item => {
        item._state_ = 'close'
        if (item[this.childrenKey] && item[this.childrenKey].length > 0) {
          this.setDefaultCloseState(item[this.childrenKey])
        }
      })
    },
    isArray (data) {
      return Object.prototype.toString.call(data) === '[object Array]'
    },
    deepClone (data) {
      return JSON.parse(JSON.stringify(data))
    }
  },
  created () { },
  mounted () { },
  computed: {
    innerColumns: function () {
      let cIndex = 0
      if (this.controlKey) {
        this.columns.find((col, index) => {
          if (col.key === this.controlKey) {
            cIndex = index
          }
        })
      }
      return this.columns.map((item, index) => {
        if (index === cIndex) {
          return { ...item, render: this.col_render }
        } else if (item.buttons) {
          let render = (h, params) => {
            return h('div', item.buttons.map(btn => btn(h, params, this)))
          }
          return { ...item, render: render }
        }
        return item
      })
    }
  },
  watch: {
    data: {
      immediate: true,
      handler: function (data) {
        if (this.isArray(data)) {
          this.original_treeData = this.markData(data) // 接收原始数据，并打上唯一标记
          this.defaultClose && this.setDefaultCloseState(this.original_treeData) // 添加默认的关闭状态
          this.tableData = this.transformTableData(this.deepClone(this.original_treeData)) // 把树形的原始数据结构转换为适合表格使用的数据结构
          // console.log(this.tableData)
        } else {
          this.original_treeData = []
          this.tableData = []
        }
      }
    }
  }
}
</script>

<style lang="less">
.i-tree-table {
  .control-cell {
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    .space {
      width: 30px;
      min-width: 30px;
      overflow: hidden;
    }
    .line {
      width: 30px;
      min-width: 30px;
      height: 100%;
      overflow: hidden;
      text-align: center;
      color:#ccc;
    }
    .control-btn {
      box-sizing: border-box;
      width: 20px;
      min-width: 20px;
      height: 20px;
      margin: 0 5px;
      padding: 0;
      overflow: hidden;
    }
  }
  .tool-box {
    margin-bottom: 10px;
    &::after {
      content: "";
      display: block;
      clear: both;
    }
  }
  .page-box {
    &::after {
      content: "";
      display: block;
      clear: both;
    }
  }
}
</style>

<style lang="less">
.i-tree-table {
  .control-btn {
    .ivu-icon {
      font-size: 12px;
    }
  }
}
</style>
