<template>
  <div class="user-avator-dropdown">
    <Dropdown trigger="click"
              @on-click="handleClick">
      <Avatar :src="userAvator === 'admin' ? adminImg : userImg" />
      {{username}}
      <Icon :size="18"
            type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="pwd">修改密码</DropdownItem>
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <pwdModal v-if="editPwdModalFlag"></pwdModal>
  </div>
</template>

<script>
import './user.less'
import { mapActions } from 'vuex'
import adminImg from '@/assets/images/admin.png'
import userImg from '@/assets/images/user.png'
import pwdModal from './pwdModal'
export default {
  name: 'User',
  components: {
    pwdModal
  },
  props: {
    userAvator: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      adminImg,
      userImg,
      editPwdModalFlag: false
    }
  },
  computed: {
    username: function () {
      return this.$store.state.user.username
    }
  },
  methods: {
    ...mapActions([
      'handleLogOut'
    ]),
    handleClick (name) {
      switch (name) {
        case 'logout':
          this.handleLogOut().then(() => {
            this.$router.push({
              name: 'login'
            })
          })
          break
        case 'pwd':
          this.editPwdModalFlag = false
          this.$nextTick(() => {
            this.editPwdModalFlag = true
          })
          break
      }
    }
  }
}
</script>
