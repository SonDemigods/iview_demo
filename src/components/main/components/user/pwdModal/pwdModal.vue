<template>
  <div>
    <Modal v-model="modalFlag"
           title='修改密码'
           :width="600"
           :mask-closable="false"
           @on-cancel="cancelModal">
      <Form ref="editPwdForm"
          :model="formData"
          :rules="ruleValidate"
          :label-width="140">
        <Row>
          <Col span="24">
          <FormItem label="旧密码："
                    prop="oldPassword">
            <Input type="password"
                  placeholder="请输入"
                  v-model="formData.oldPassword" />
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
          <FormItem label="新密码："
                    prop="newPassword">
            <Input type="password"
                  placeholder="请输入"
                  v-model="formData.newPassword" />
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
          <FormItem label="确认新密码："
                    prop="passwdCheck">
            <Input type="password"
                  placeholder="请输入"
                  v-model="formData.passwdCheck" />
          </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button @click="cancelModal">关闭</Button>
        <Button type="primary"
                style="margin-left:10px;"
                @click="formSave">保存</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  components: {},
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请填写密码'))
      } else if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else {
        if (this.formData.passwdCheck) {
          this.$refs.editPwdForm.validateField('passwdCheck')
        }
        callback()
      }
    }
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.formData.newPassword) {
        callback(new Error('两次密码输入不一致'))
      } else {
        callback()
      }
    }
    return {
      modalFlag: false,
      formData: {
        oldPassword: '', // 旧密码
        newPassword: '', // 密码
        passwdCheck: ''
      },
      ruleValidate: {
        oldPassword: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        passwdCheck: [
          { required: true, validator: validatePassCheck, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    userId () {
      return this.$store.state.user.userId
    }
  },
  methods: {
    ...mapActions([
      'handleLogOut'
    ]),
    formSave () {
      this.$refs.editPwdForm.validate(flag => {
        if (flag) {
          let params = {
            userId: this.userId,
            oldPassword: this.formData.oldPassword,
            newPassword: this.formData.newPassword
          }
          // console.log(params)
          this.$api('/API/user/modifyPassword', params).then(res => {
            if (res && res.status === 20) {
              this.cancelModal()
              this.$Message.success('密码修改成功')
              this.handleLogOut().then(() => {
                this.$router.push({
                  name: 'login'
                })
              })
            }
          })
        }
      })
    },
    cancelModal () {
      this.modalFlag = false
    }
  },
  created () {},
  mounted () {
    this.modalFlag = true
  },
  watch: {}
}
</script>

<style scoped>
</style>
