<template>
  <div class="imgModal"
       v-if="visible">
    <span class="closeModal"
          @click="close">×</span>
    <div class="mark"></div>
    <div class="container"
         ref="imgContainer"
         @mousemove="imgmousemove"
         @mouseup="imgmouseup"
         @DOMMouseScroll="imgmousewheel"
         @mousewheel="imgmousewheel">
      <img :src="imgUrl"
           ref="imgRef"
           @mousedown="imgmousedown">
    </div>
  </div>
</template>
<script>

// 操作class
function hasClass (elements, cName) {
  return !!elements.className.match(new RegExp('(\\s|^)' + cName + '(\\s|$)'))
}
function addClass (elements, cName) {
  if (!hasClass(elements, cName)) {
    elements.className += ' ' + cName
  }
}
function removeClass (elements, cName) {
  if (hasClass(elements, cName)) {
    elements.className = elements.className.replace(new RegExp('(\\s|^)' + cName + '(\\s|$)'), ' ')
  }
}

export default {
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    imgUrl: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      zoomMultiples: 1, // 缩放倍数
      mousedownFlag: false, // 判断鼠标是否按下
      startX: 0, // 鼠标点击开始X坐标
      startY: 0, // 鼠标点击开始Y坐标
      startLeft: 0, // 图片初始定位  left
      startTop: 0 // 图片初始定位  top
    }
  },
  methods: {
    close () {
      this.$emit('update:visible', false)
    },
    imgmousedown (e) {
      // 取消浏览器默认行为
      if (e.preventDefault) {
        e.preventDefault()
      } else {
        e.returnValue = false
      }
      // 鼠标按下时记录其实位置
      this.mousedownFlag = true
      this.startX = e.clientX
      this.startY = e.clientY
      if (!this.$refs.imgRef) {
        return
      }
      this.startLeft = this.$refs.imgRef.offsetLeft
      this.startTop = this.$refs.imgRef.offsetTop
    },
    imgmousemove (e) {
      if (this.mousedownFlag && this.$refs.imgRef) {
        var moveX = this.startLeft - (this.startX - e.clientX) // 图片的 定位left
        var moveY = this.startTop - (this.startY - e.clientY) // 图片的 定位top
        this.$refs.imgRef.style.left = moveX + 'px'
        this.$refs.imgRef.style.top = moveY + 'px'
      }
    },
    imgmouseup (e) {
      // 鼠标松开时还原
      this.mousedownFlag = false
      this.startX = 0
      this.startY = 0
    },
    // 图片滚轮事件
    imgmousewheel (e) {
      if (e.preventDefault) {
        e.preventDefault()
      } else {
        e.returnValue = false
      }
      if (e.wheelDelta > 0 || e.detail < 0) {
        this.zoomMultiples += 0.1
        this.$refs.imgRef.style.transform = 'scale(' + this.zoomMultiples + ')'
        this.$refs.imgRef.style.msTransform =
          '-ms-scale(' + this.zoomMultiples + ')'
        this.$refs.imgRef.style.webkitTransform =
          '-webkit-scale(' + this.zoomMultiples + ')'
        this.$refs.imgRef.style.mozTransform =
          '-moz-scale(' + this.zoomMultiples + ')'
      } else if (e.wheelDelta < 0 || e.detail > 0) {
        this.zoomMultiples -= 0.1
        this.zoomMultiples =
          this.zoomMultiples <= 0.1 ? 0.1 : this.zoomMultiples
        this.$refs.imgRef.style.transform = 'scale(' + this.zoomMultiples + ')'
        this.$refs.imgRef.style.msTransform =
          '-ms-scale(' + this.zoomMultiples + ')'
        this.$refs.imgRef.style.webkitTransform =
          '-webkit-scale(' + this.zoomMultiples + ')'
        this.$refs.imgRef.style.mozTransform =
          '-moz-scale(' + this.zoomMultiples + ')'
      }
    },
    onImgReady () {
      this.resetImgOffset()
      this.$refs.imgRef.style.opacity = 1
    },
    resetImgOffset () {
      if (this.$refs.imgRef) {
        this.$refs.imgRef.style.left =
          (this.$refs.imgContainer.offsetWidth -
            this.$refs.imgRef.offsetWidth) /
          2 +
          'px'
        this.$refs.imgRef.style.top =
          (this.$refs.imgContainer.offsetHeight -
            this.$refs.imgRef.offsetHeight) /
          2 +
          'px'
      }
    },
    keyEscFun (e) {
      if (e.keyCode === 27) {
        this.$emit('update:visible', false)
      }
    },
    handleDestory () {
      removeClass(document.body, 'body_hidden')
      window.removeEventListener('resize', this.resetImgOffset)
      window.removeEventListener('keydown', this.keyEscFun)
      if (this.$el && this.visible) {
        console.log(this.$el)
        document.body.removeChild(this.$el)
      }
    }
  },
  created () {
    window.addEventListener('resize', this.resetImgOffset)
    window.addEventListener('keydown', this.keyEscFun)
  },
  beforeDestroy () {
    this.handleDestory()
  },
  deactivated () {
    this.handleDestory()
  },
  mounted () { },
  computed: {},
  watch: {
    visible: function (val) {
      if (val) {
        this.$nextTick(() => {
          addClass(document.body, 'body_hidden')
          document.body.appendChild(this.$el)
          this.zoomMultiples = 1
          this.$refs.imgRef.style.opacity = 0
          this.$refs.imgRef.onload = () => {
            this.onImgReady()
          }
          if (this.$refs.imgRef.complete) {
            this.onImgReady()
          }
        })
      } else {
        removeClass(document.body, 'body_hidden')
      }
    }
  }
}
</script>

<style scoped>
.imgModal {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  min-width: 1280px;
  z-index: 11199;
}
.closeModal {
  position: absolute;
  right: 20px;
  line-height: 30px;
  top: 20px;
  color: #fff;
  opacity: 0.8;
  font-size: 50px !important;
  z-index: 12000;
  cursor: pointer;
}
.mark {
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.5;
  z-index: 11990;
}
.container {
  width: 100%;
  z-index: 11991;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.container img {
  max-width: 90%;
  max-height: 90%;
  height: auto;
  width: auto;
  position: absolute;
}
</style>
<style>
.body_hidden {
  overflow: hidden;
}
</style>
