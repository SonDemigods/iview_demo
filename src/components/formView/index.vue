<template>
  <div>
    <Form ref="formData"
          class="FormCSS clearfix"
          :model="formData"
          :rules="ruleValidate"
          inline
          :label-width="110">
      <FormItem v-for="(item , index) in labelData"
                :key="index"
                :label="item.label==='头像' ? '':item.label"
                :prop="item.key">
        <cropper style="border:1px solid #eeeeee; box-shadow: 9px 9px 9px #d4d4d4;"
                 v-if="item.type==='headImg'"
                 :width="130"
                 :height="155"
                 :cropperImg='cropperImg'>
          <Icon v-if="!isImg"
                slot="icon"
                type="ios-camera"
                size="40">{{item.key}}</Icon>
          <!--<span>上传图片</span>-->
          <img style="width:130px;height:155px"
               slot="img"
               v-if="isImg"
               :src="`http://${formData[item.key]}`" />
        </cropper>
        <Input style=" width: 200px"
               v-else-if="item.type==='input'"
               clearable
               v-model="formData[item.key]"
               placeholder="请输入内容">
        </Input>
        <InputNumber style=" width: 200px"
                     v-else-if="item.type==='int'"
                     :min="1"
                     v-model="formData[item.key]"
                     placeholder="请输入内容">
        </InputNumber>
        <Select style="width: 200px"
                v-else-if="item.type==='select'"
                clearable
                v-model="formData[item.key]"
                placeholder="请选择">
          <Option v-for="item in item.codeData"
                  :key="item.code"
                  :label="item.codeName"
                  :value="item.code">
          </Option>
        </Select>
        <DatePicker style="width: 200px"
                    v-else-if="item.type==='month'"
                    clearable
                    v-model="formData[item.key]"
                    type="month"
                    format="yyyy-MM"
                    placeholder="选择日期">
        </DatePicker>
        <DatePicker style="width: 200px"
                    v-else-if="item.type==='date'"
                    clearable
                    v-model="formData[item.key]"
                    type="date"
                    format="yyyy-MM-dd"
                    placeholder="选择日期">
        </DatePicker>
        <Cascader style="width: 200px"
                  v-else-if="item.type==='address'"
                  clearable
                  v-model="formData[item.key]"
                  :data="item.data"
                  placeholder="选择区域">
        </Cascader>
        <RadioGroup style=" width: 200px"
                    v-else-if="item.type==='radio'"
                    v-model="formData[item.key]">
          <Radio v-for="ite in item.codeData"
                 :key="ite.code"
                 :label="ite.code">
            {{ite.codeName}}
          </Radio>
        </RadioGroup>
        <CheckboxGroup style=" width: 200px"
                       v-else-if="item.type==='checkbox'"
                       v-model="formData[item.key]">
          <Checkbox v-for="item in item.codeData"
                    :key="item.code"
                    :label="item.code">
            {{item.codeName}}
          </Checkbox>
        </CheckboxGroup>
        <div @click="inputClick"
             v-else-if="item.type==='dicTree'">
          <Input style="width: 200px"
                 v-model="formData[item.key]"
                 readonly
                 placeholder="请选择" />
          <Drawer :title="'选择'+item.label+'：'"
                  class="drawerCss"
                  v-model="drawerModel"
                  width="350"
                  :mask-closable="false">
            <orgTree ref="orgTree"
                     class="modalCss"
                     @org-tree-click="orgTreeClick"></orgTree>
          </Drawer>
        </div>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import orgTree from '@/view/components/orgTree'
import cropper from '_c/cropper/cropper.vue'
export default {
  components: {
    orgTree,
    cropper
  },
  props: {
    labelData: {
      type: Array,
      default: function () {
        return []
      }
    },
    data: {
      type: Object,
      default: function () {
        return {}
      }
    },
    ruleValidate: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      formData: {},
      drawerModel: false,
      isImg: false
    }
  },
  computed: {},
  methods: {
    init (data) {
      this.formData = data
    },
    back () {
      this.$emit('back', 'back')
    },
    onSave () {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          this.$emit('onSave', this.formData)
        }
      })
    },
    cropperImg (imgData) {
      console.log(imgData)
      let resData = imgData || {}
      this.formData.a5714url = `${resData.imagePath}${resData.fileGroup}/${resData.fileRealPath}?attname=${resData.fileOriginName}`
      this.formData.a5714 = imgData.fileId
      this.isImg = false
      this.$nextTick(() => {
        this.isImg = true
      })
      console.log(this.formData.a5714url)
    },
    orgTreeClick (item) {
      console.log('orgTreeClick=>', item)
      this.drawerModel = false
      this.formData.a5204a = item.title
      this.formData.b000 = item.b000
    },
    inputClick () {
      this.drawerModel = true
    }
  }
}
</script>
<style lang='less'>
.FormCSS {
  /deep/ .ivu-form-item {
    float: right;
    width: 310px;
  }
}
.inputClass > .ivu-input {
  cursor: pointer !important;
}

.drawerCss > .ivu-drawer-mask,
.drawerCss > .ivu-drawer-wrap {
  z-index: 9999;
}
.clearfix:after {
  content: " ";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
</style>
