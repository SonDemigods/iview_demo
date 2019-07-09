<style lang="less">
@import "./login.less";
</style>

<template>
  <div class="login">
    <div class="login-con">
      <div class="logoW">
        <img src="../../../assets/images/login-logo.png" />
      </div>
      <div class="form-con">
        <login-form @on-success-valid="handleSubmit"></login-form>
      </div>
    </div>

    <div class="footer">青海省委组织部 天津市天房科技发展股份有限公司 联合研发</div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit ({ username, password }) {
      this.handleLogin({ username, password }).then(res => {
        window.localStorage.setItem('fromLoginPage', '1')
        this.$router.push({
          name: this.$config.homeName
        })
      })
    }
  }
}
</script>

<style>
</style>
