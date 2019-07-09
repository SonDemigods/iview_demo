<template>
  <div class="drag-a-drop">
    <div class="drag-a-drop-box"
         ref="dragBox">
      <div class="drag-a-drbox-loading loading-bg"
           v-show="drboxLoading">
        <icon type="ios-loading"
              size="30"
              color="#fff"
              class="rotation" />
      </div>
      <div class="drag-a-drbox-loading"
           v-show="drboxDefault">
        <div>暂无图片</div>
      </div>
      <Icon type="ios-arrow-back"
            size="40"
            class="drag-a-drbox-arrow drag-a-drbox-arrowl"
            @click.native="gotoLeft"
            :class="{'disabled':current===1}" />
      <Icon type="ios-arrow-forward"
            size="40"
            class="drag-a-drbox-arrow drag-a-drbox-arrowr"
            @click.native="gotoRight"
            :class="{'disabled':currentDisR}" />
      <vue-draggable-resizable @dragging="onDrag"
                               @resizing="onResize"
                               style="position: static;">
        <img :style="{position:'absolute',left:(x+defx)+'px',top:(y+10)+'px'}"
             :src="picurl[0]"
             alt=""
             ref="dragImg">
      </vue-draggable-resizable>
      <vue-draggable-resizable @dragging="onDrag2"
                               @resizing="onResize2"
                               style="position: static;"
                               v-show="pageSize===2">
        <img :style="{position:'absolute',left:(x1+defxr)+'px',top:(y1+10)+'px'}"
             :src="picurl[1]"
             v-show="picurl[1]"
             alt=""
             ref="dragImg2">
      </vue-draggable-resizable>
      <!--<div class="drag-a-drop-boxbtns">-->
      <!--<div class="drag-a-drop-boxbtn drag-a-drop-boxbtnl"-->
      <!--:class="{'active':pageSize===1}"-->
      <!--@click="changeSingle(1)">单页-->
      <!--</div>-->
      <!--<div class="drag-a-drop-boxbtn drag-a-drop-boxbtnr"-->
      <!--:class="{'active':pageSize===2}"-->
      <!--@click="changeSingle(2)">双页-->
      <!--</div>-->
      <!--</div>-->
    </div>
    <div class="drag-a-drop-bot">
      <Slider v-model="sliderVal"
              show-input
              :min="50"
              :max="200"
              @on-input="changeNum"></Slider>
      <div class="drag-a-drop-botr">
        <!--<Button type="text"-->
        <!--size="small"-->
        <!--ghost-->
        <!--:class="{'active':standardType===0}"-->
        <!--@click.native="changeStandardType(0)">标准-->
        <!--</Button>-->
        <!--<Button type="text"-->
        <!--size="small"-->
        <!--ghost-->
        <!--:class="{'active':standardType===1}"-->
        <!--@click.native="changeStandardType(1)">高清-->
        <!--</Button>-->
        <Button icon="md-print"
                size="small"
                @click.native="putPrint"
                v-if="applyIsPrint === 1"
                style="margin-right: 12px">打印</Button>
        <RadioGroup v-model="singleOrTwo"
                    type="button"
                    size="small"
                    @on-change="changeSingleOrTwo">
          <Radio :label="1">单页</Radio>
          <Radio :label="2">双页</Radio>
        </RadioGroup>
      </div>
    </div>
    <Page :total="total"
          class="PageDragADrop"
          :current="current"
          :page-size="pageSize"
          @on-change="changeCurrent">
    </Page>
  </div>
</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable'
// import cadrePage from '@/view/components/cadrePage'
export default {
  data: function () {
    return {
      singleOrTwo: 1,
      x: 0,
      x1: 0,
      defx: 0,
      defx1: 0,
      defx2: 0,
      defxr: 0,
      defxr2: 0,
      defHeight: 0,
      y: 0,
      y1: 0,
      //        isSinglePage: true,
      standardType: 0,
      sliderVal: 100,
      drboxLoading: false,
      drboxDefault: true,
      current: 1,
      pageSize: 1
    }
  },
  mounted () {
    this.changeHeight()
  },
  components: {
    VueDraggableResizable
    //    cadrePage
  },
  methods: {
    putPrint () {
      this.$emit('on-printing')
    },
    changeCurrent (e) {
      this.current = e
    },
    gotoLeft () {
      if (this.current !== 1) {
        this.current = this.current - 1
      }
    },
    gotoRight () {
      if (!this.currentDisR) {
        this.current = this.current + 1
      }
    },
    changeHeight () {
      setTimeout(() => {
        this.$refs.dragImg.style.height = (this.$refs.dragBox.clientHeight - 20) + 'px'
        setTimeout(() => {
          this.defHeight = this.$refs.dragImg.clientHeight
          if (this.pageSize === 1) {
            this.defx = (this.$refs.dragBox.clientWidth - this.$refs.dragImg.clientWidth) / 2
            this.defx1 = this.defx
            this.defx2 = (this.$refs.dragBox.clientWidth - this.$refs.dragImg.clientWidth - this.$refs.dragImg2.clientWidth) / 6
            this.defxr = this.$refs.dragBox.clientWidth - this.defx2 - this.$refs.dragImg.clientWidth
            this.defxr2 = this.defxr
          } else {
            this.defx = (this.$refs.dragBox.clientWidth - this.$refs.dragImg.clientWidth - this.$refs.dragImg2.clientWidth) / 6
            this.defx2 = this.defx
            this.defxr = this.$refs.dragBox.clientWidth - this.defx - this.$refs.dragImg.clientWidth
            this.defxr2 = this.defxr
          }
        }, 10)
      }, 10)
    },
    init () {
      if (this.picurls.length > 0) {
        let img = new Image()
        img.src = this.picurls[0]
        img.onload = () => {
          this.changeHeight()
          this.drboxDefault = false
        }
      }
      if (this.picurls.length > 1) {
        let img2 = new Image()
        img2.src = this.picurls[1]
        img2.onload = () => {
          this.drboxDefault = false
          this.changeHeight()
        }
      }
    },
    onResize: function (x, y, width, height) {
      this.x = x
      this.y = y
    },
    onDrag: function (x, y) {
      this.x = x
      this.y = y
    },
    onResize2: function (x, y, width, height) {
      this.x1 = x
      this.y1 = y
    },
    onDrag2: function (x, y) {
      this.x1 = x
      this.y1 = y
    },
    changeStandardType (e) {
      if (this.standardType === e) {
        this.$emit('on-change-standardType', e)
        this.standardType = e
      }
    },
    changeNum (e) {
      this.$refs.dragImg.style.height = this.defHeight * (e / 100) + 'px'
      this.$refs.dragImg2.style.height = this.defHeight * (e / 100) + 'px'
    },
    changeSingleOrTwo (e) {
      this.changeSingle(e)
    },
    changeSingle (e) {
      if (this.pageSize !== e) {
        if (e === 2 && (this.total === 1 || this.total === 0)) {
          return
        }
        this.initSliderVal()
        this.pageSize = e
        if (e === 1) {
          this.defx = this.defx1
          this.current = this.current * 2 - 1
        } else {
          this.current = Math.ceil(this.current / 2)
          this.defx = this.defx2
          this.defxr = this.defxr2
          this.$refs.dragImg2.style.height = (this.$refs.dragBox.clientHeight - 20) + 'px'
        }
      }
    },
    initSliderVal () {
      this.sliderVal = 100
    },
    initCurrent (e) {
      if (this.pageSize === 1) {
        this.current = e
      } else {
        this.current = Math.ceil(e / 2)
      }
    },
    changeDrboxLoading (e) {
      this.drboxLoading = e
    }
  },
  props: {
    picurls: {
      type: Array,
      default: function () {
        return ['http://a.hiphotos.baidu.com/zhidao/pic/item/55e736d12f2eb938fb185281d3628535e5dd6f4f.jpg']
      }
    },
    dirId: {
      type: String,
      required: false
    },
    applyIsPrint: {
      type: Number,
      default: 1
    }
  },
  computed: {
    picurl () {
      let arr = []
      if (this.picurls.length === 0) {
        return arr
      }
      if (this.pageSize === 1) {
        arr[0] = this.picurls[this.current - 1]
        return arr
      } else if (this.pageSize === 2) {
        arr[0] = this.picurls[this.current * 2 - 2]
        if (this.picurls[this.current * 2 - 1]) {
          arr[1] = this.picurls[this.current * 2 - 1]
        }
        return arr
      }
    },
    total () {
      return this.picurls.length
    },
    currentDisR () {
      if (this.total === 0) {
        return true
      }
      let t = Math.ceil(this.total / 2)
      if (this.pageSize === 1 && this.total === this.current) {
        return true
      } else if (this.pageSize === 2 && t === this.current) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    'picurl' (a, b) {
      if (a.length !== 0) {
        this.drboxLoading = true
        let i = 0
        let finishFn = () => {
          if (a[1]) {
            if (i === 2) {
              this.drboxLoading = false
              this.drboxDefault = false
            }
          } else {
            if (i === 1) {
              this.drboxLoading = false
              this.drboxDefault = false
            }
          }
        }
        if (a[0]) {
          let aImg = new Image()
          aImg.src = a[0]
          aImg.onload = () => {
            i++
            finishFn()
          }
          aImg.onerror = () => {
            this.drboxLoading = false
            this.drboxDefault = true
          }
        }
        if (a[1]) {
          let bImg = new Image()
          bImg.src = a[1]
          bImg.onload = () => {
            i++
            finishFn()
          }
          bImg.onerror = () => {
            this.drboxLoading = false
            this.drboxDefault = true
          }
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "./dragADrop";
</style>
