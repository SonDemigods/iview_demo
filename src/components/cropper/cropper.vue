<template>
  <div :style="{width:width+'px',height:height+'px'}">
    <input type="file"
           v-if="fileShow"
           id="uploads"
           style="position:absolute; clip:rect(0 0 0 0);"
           accept="image/png, image/jpeg, image/gif, image/jpg"
           @change="uploadImg($event)">
    <label class="btn"
           for="uploads">
      <slot name="icon"></slot>
      <slot :style="{width:width+'px',height:height+'px'}"
            name="img"></slot>
    </label>
    <Modal v-model="cropperView"
           title="头像剪裁"
           :mask-closable=false
           @on-ok="ok">
      <vueCropper ref="cropper"
                  :img="option.img"
                  :outputSize="option.size"
                  :outputType="option.outputType"
                  :info="true"
                  :full="option.full"
                  :canMove="option.canMove"
                  :canMoveBox="option.canMoveBox"
                  :fixedBox="option.fixedBox"
                  :original="option.original"
                  :autoCrop="option.autoCrop"
                  :autoCropWidth="option.autoCropWidth"
                  :autoCropHeight="option.autoCropHeight"
                  :centerBox="option.centerBox"
                  :high="option.high"
                  :infoTrue="option.infoTrue"
                  @realTime="realTime"
                  @imgLoad="imgLoad"
                  @cropMoving="cropMoving"
                  :enlarge="option.enlarge"
                  :mode="option.mode"></vueCropper>

      <Upload ref="upload"
              v-show="false"
              :show-upload-list="false"
              :before-upload="beforeUpload"
              :headers="Token"
              :on-success="unloadSuccess"
              :format="['jpg','png','jpeg','bmp','JPG','PNG','JPEG','BMP']"
              :max-size="1024 * 30"
              type="drag"
              :action="`${$baseUrl}/API/file/upload`"
              style="display: inline-block;width:100%;float: right;">
      </Upload>

    </Modal>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
import { getToken } from '@/libs/util'

export default {
  name: 'cropper',
  components: {
    VueCropper
  },
  data () {
    return {
      Token: { token: getToken() },
      cropperView: false,
      fileShow: true,
      previews: {},
      previewStyle1: {},
      previewStyle2: {},
      option: {
        img: '',
        size: 1,
        full: false,
        outputType: 'png',
        canMove: true,
        fixedBox: false,
        original: false,
        canMoveBox: true,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 200,
        autoCropHeight: 150,
        centerBox: false,
        high: true,
        cropData: {},
        enlarge: 1,
        mode: 'contain'
      }
    }
  },
  props: {

    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },

    cropperImg: {
      type: Function,
      default () {
        return () => {
        }
      }
    }
  },
  mounted () {
    console.log(this.Token)
  },
  methods: {
    uploadImg (e) {
      // 上传图片
      // this.option.img
      var file = e.target.files[0]
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
        return false
      }
      var reader = new FileReader()
      reader.onload = e => {
        let data
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          data = e.target.result
        }
        this.option.img = data
        this.cropperView = true
      }
      // 转化为base64
      reader.readAsDataURL(file)
      this.fileShow = false
      this.$nextTick(() => {
        this.fileShow = true
      })
      // 转化为blob
      // reader.readAsArrayBuffer(file)
    },
    realTime (data) {
      var previews = data
      var h = 0.5
      var w = 0.2

      this.previewStyle1 = {
        width: previews.w + 'px',
        height: previews.h + 'px',
        overflow: 'hidden',
        margin: '0',
        zoom: h
      }

      this.previewStyle2 = {
        width: previews.w + 'px',
        height: previews.h + 'px',
        overflow: 'hidden',
        margin: '0',
        zoom: w
      }
      this.previews = data
    },
    imgLoad (msg) {
    },
    cropMoving (data) {
      this.option.cropData = data
    },

    ok () {
      this.$refs.cropper.getCropData(data => {
        this.beforeUpload(this.dataURLtoFile(data, this.fileName()))
        // this.cropperImg(data)
      })
    },
    beforeUpload (file) {
      this.$refs.upload.post(file)
      // 阻止自动上传
      return false
    },
    unloadSuccess (res, file) {
      if (res.status === 20) {
        this.$Message.success('照片上传成功')
        this.cropperImg(res.data)
      } else {
        this.$Message.error('照片上传失败')
      }
    },
    fileName () {
      var now = new Date()
      var yy = now.getFullYear() // 年
      var mm = now.getMonth() + 1 // 月
      var dd = now.getDate() // 日
      var hh = now.getHours() // 时
      var ii = now.getMinutes() // 分
      var ss = now.getSeconds() // 秒
      var clock = yy
      if (mm < 10) clock += '0'
      clock += mm
      if (dd < 10) clock += '0'
      clock += dd
      if (hh < 10) clock += '0'
      clock += hh
      if (ii < 10) clock += '0'
      clock += ii
      if (ss < 10) clock += '0'
      clock += ss
      return clock + '.jpg'
    },
    dataURLtoFile (dataurl, filename) { // 将base64转换为文件
      let arr = dataurl.split(',')
      let mime = arr[0].match(/:(.*?);/)[1]
      let bstr = atob(arr[1])
      let n = bstr.length
      let u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], filename, { type: mime })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .ivu-modal-body {
  height: 300px;
}

.btn {
  width: 100%;
  height: 100%;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  font-size: 14px;
  color: #2e2e2e;
  transition: all 0.2s ease;
  text-decoration: none;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
