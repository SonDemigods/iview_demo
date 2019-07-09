<template>
  <div :class="wrapClasses"
       :style="styles"
       @click="handleClick">
    <div :class="[prefixCls + '-tail']"><i></i></div>
    <div style="display:none;">{{stepNumber}}</div>
    <div :class="[prefixCls + '-head']">
      <div :class="[prefixCls + '-head-inner']">
        <span v-if="!icon && currentStatus != 'finish' && currentStatus != 'error'">{{ stepNumber }}</span>
        <span v-else
              :class="iconClasses"></span>
      </div>
    </div>
    <div :class="[prefixCls + '-main']">
      <div :class="[prefixCls + '-title']">{{ title }}</div>
      <slot>
        <div v-if="content"
             :class="[prefixCls + '-content']"><span class="num-box">{{num}}</span>{{ content }}</div>
      </slot>
    </div>
  </div>
</template>
<script>
import Emitter from '../../mixins/emitter'
import { oneOf, findComponentUpward } from '../../utils/assist'

const prefixCls = 'ivu-steps'
const iconPrefixCls = 'ivu-icon'

export default {
  name: 'Step',
  mixins: [Emitter],
  props: {
    status: {
      validator (value) {
        return oneOf(value, ['wait', 'process', 'finish', 'error'])
      }
    },
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String
    },
    num: {
      type: [Number, String]
    },
    icon: {
      type: String
    }
  },
  data () {
    return {
      prefixCls: prefixCls,
      stepNumber: '',
      nextError: false,
      total: 1,
      currentStatus: ''
    }
  },
  computed: {
    wrapClasses () {
      return [
        `${prefixCls}-item`,
        `${prefixCls}-status-${this.currentStatus}`,
        {
          [`${prefixCls}-custom`]: !!this.icon,
          [`${prefixCls}-next-error`]: this.nextError
        }
      ]
    },
    iconClasses () {
      let icon = ''

      if (this.icon) {
        icon = this.icon
      } else {
        if (this.currentStatus === 'finish') {
          icon = 'ios-checkmark'
        } else if (this.currentStatus === 'error') {
          icon = 'ios-close'
        }
      }

      return [
        `${prefixCls}-icon`,
        `${iconPrefixCls}`,
        {
          [`${iconPrefixCls}-${icon}`]: icon !== ''
        }
      ]
    },
    styles () {
      return {
        width: `${1 / this.total * 100}%`
      }
    }
  },
  methods: {
    handleClick () {
      const $parent = findComponentUpward(this, 'Steps')
      const index = this.stepNumber - 1
      $parent.$emit('on-click', index)
    }
  },
  watch: {
    status (val) {
      this.currentStatus = val
      if (this.currentStatus === 'error') {
        this.$parent.setNextError()
      }
    }
  },
  created () {
    this.currentStatus = this.status
  },
  mounted () {
    this.dispatch('Steps', 'append')
  },
  beforeDestroy () {
    this.dispatch('Steps', 'remove')
  }
}
</script>
<style lang="less">
.ivu-steps-item {
  cursor: pointer;
}
.num-box {
  color: #2d8cf0;
  font-size: 14px;
  font-weight: bold;
}
</style>
