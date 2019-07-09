<template>
  <div>
    <Tooltip v-for="(item, index) in uploadList"
             :key="index"
             transfer
             placement="top-start"
             theme="light"
             max-width="500px"
             :disabled="!showFileName"
             :content="item.name ? item.name : '暂无文件名'">
      <div class="file-item">
        <template v-if="item.status === 'finished'">
          <img v-if="isPic(item.url)"
               :src="item.url">
          <img v-else
               class="wenjian_icon"
               src="./imgs/wenjian.png">
          <div class="file-item-cover">
            <Icon type="ios-eye-outline"
                  @click.native="handleView(item)"></Icon>
            <Icon type="ios-trash-outline"
                  v-if="!onlyDisplay"
                  @click.native="handleRemove(item)"></Icon>
          </div>
        </template>
        <template v-else>
          <Progress v-if="item.showProgress"
                    :percent="item.percentage"
                    hide-info></Progress>
        </template>
      </div>
    </Tooltip>

    <Upload v-show="!onlyDisplay && uploadList.length < maxCount"
            ref="upload"
            multiple
            :show-upload-list="false"
            :default-file-list="defaultFileList"
            :on-success="handleSuccess"
            :format="format"
            :max-size="maxSize"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :on-error="handleError"
            :before-upload="handleBeforeUpload"
            :headers="headers"
            :data="data"
            :name="name"
            :with-credentials="withCredentials"
            :type="type"
            :action="action"
            style="display: inline-block;width:58px;">
      <template v-if="!$slots || !$slots.default">
        <div v-if="type==='drag'"
             class="drag-place">
          <Icon type="ios-camera"
                size="20"></Icon>
        </div>
        <div v-if="type==='select'"
             class="selectBtn">
          <Icon type="ios-camera"
                size="20"></Icon>
        </div>
      </template>
      <template v-else>
        <slot></slot>
      </template>
    </Upload>

    <imgModel :visible.sync="visible_img"
              :imgUrl="previewImgUrl"></imgModel>
  </div>
</template>
<script>
import imgModel from './components/imgModel'
import { getToken } from '@/libs/util'
export default {
  components: {
    imgModel
  },
  props: {
    flist: {
      type: Array,
      default: () => {
        return []
      }
    },
    action: {
      type: String,
      default: function () {
        return `${this.$baseUrl}/API/file/upload`
      }
    },
    showFileName: {
      type: Boolean,
      default: false
    },
    format: {
      type: Array,
      default: () => {
        return ['jpg', 'jpeg', 'png', 'bmp', 'gif', 'pdf', 'doc', 'docx', 'xls', 'xlsx']
      }
    },
    manual: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'drag'
    },
    onlyDisplay: {
      type: Boolean,
      default: false
    },
    hiddenFileList: {
      type: Boolean,
      default: false
    },
    maxSize: {
      type: Number,
      default: 20480
    },
    headers: {
      type: Object,
      default: () => {
        return { token: getToken() }
      }
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    name: {
      type: String,
      default: 'file'
    },
    maxCount: {
      type: Number,
      default: 10
    },
    withCredentials: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      previewImgUrl: '',
      visible_img: false,
      defaultFileList: [],
      uploadList: []
    }
  },
  methods: {
    getSuffix (url) {
      if (!url) {
        return ''
      } else {
        return url.substring(url.lastIndexOf('.') + 1, url.length)
      }
    },
    isPic (url) {
      let picSuffix = ['BMP', 'JPG', 'JPEG', 'PNG', 'GIF', 'WEBP']
      let suffix = this.getSuffix(url).toUpperCase()
      if (picSuffix.indexOf(suffix) > 0) {
        return true
      }
      return false
    },
    handleView (item) {
      if (this.isPic(item.url)) {
        this.previewImgUrl = item.url
        this.visible_img = true
      } else {
        this.$emit('preview-file', item)
      }
    },
    handleRemove (file) {
      const fileList = this.$refs.upload.fileList
      this.uploadList.splice(fileList.indexOf(file), 1)
      this.$emit('update:flist', this.uploadList)
    },
    handleSuccess (res, file, fileList) {
      // !liyu:根据具体服务器响应格式要对此函数做调整
      if (res.status === 20) {
        let resData = res.data ? res.data : {}
        file.url = `http://${resData.imagePath}${resData.fileGroup}/${resData.fileRealPath}?attname=${resData.fileOriginName}`
        file.name = `${resData.fileOriginName}`
        this.$emit('update:flist', this.uploadList)
        this.$emit('on-success', res, file, fileList)
      } else {
        this.$Message.error(res.msg ? res.msg : '文件上传失败')
        const fileList = this.$refs.upload.fileList
        this.uploadList.splice(fileList.indexOf(file), 1)
        this.$emit('on-error', res, file)
      }
    },
    handleFormatError (file) {
      let tip = this.format.join('、')
      this.$Notice.warning({
        title: '文件格式不正确',
        desc:
          `文件 ${file.name} 格式不正确，请上传 ${tip} 格式的文件。`
      })
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: '超出文件大小限制',
        desc: `文件 ${file.name} 太大，不能超过  ${this.maxSize} Kb。`
      })
    },
    handleError (error, file) {
      this.$Message.error(`文件上传失败`)
      this.$emit('on-error', error, file)
    },
    handleBeforeUpload (file) {
      if (this.uploadList.length >= this.maxCount) {
        this.$Notice.warning({
          title: `最多允许上传 ${this.maxCount} 个文件。`
        })
        return false
      }
      let suffix = this.getSuffix(file.name)
      if (this.format.indexOf(suffix) === -1) {
        this.handleFormatError(file)
        return false
      }
      if (this.manual) {
        this.$emit('need-upload-file', file)
        return false
      } else {
        return true
      }
    },
    upload (file) {
      if (this.uploadList.length < this.maxCount) {
        this.$refs.upload.post(file)
      } else {
        this.$Notice.warning({
          title: `最多允许上传 ${this.maxCount} 个文件。`
        })
      }
    }
  },
  mounted () {
    if (this.$refs && this.$refs.upload) {
      this.uploadList = this.$refs.upload.fileList
    }
  },
  watch: {
    flist: {
      immediate: true,
      handler: function (val, oldVal) {
        this.defaultFileList = this.flist
        this.$nextTick(() => {
          if (this.$refs && this.$refs.upload) {
            // default-file-list的改变或上传新的图片，都会引起this.$refs.upload.fileList的改变
            this.uploadList = this.$refs.upload.fileList
          }
        })
      }
    }
  }
}
</script>
<style scoped>
.drag-place {
  width: 58px;
  height: 58px;
  line-height: 58px;
}
.selectBtn {
  width: 60px;
  height: 60px;
  line-height: 60px;
  overflow: hidden;
  background: #fff;
  border: 1px dashed #161618;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  position: relative;
  transition: border-color 0.2s ease;
}
.selectBtn:hover {
  border-color: #2d8cf0;
}
.file-item {
  display: inline-block;
  width: 60px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.file-item img {
  width: 100%;
  height: 100%;
}
.file-item-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.file-item:hover .file-item-cover {
  display: block;
}
.file-item-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
.wenjian_icon {
  display: block !important;
  width: 40px !important;
  height: 40px !important;
  margin: 10px auto !important;
}
</style>

<style>
.ivu-tooltip-inner {
  word-break: break-all !important;
}
</style>
