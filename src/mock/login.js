// import {
//   getParams
// } from '@/libs/util'
// const USER_MAP = {
//   super_admin: {
//     name: 'super_admin',
//     user_id: '1',
//     access: ['super_admin', 'admin'],
//     token: 'super_admin',
//     avator: 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png'
//   },
//   admin: {
//     name: 'admin',
//     user_id: '2',
//     access: ['admin'],
//     token: 'admin',
//     avator: 'https://avatars0.githubusercontent.com/u/20942571?s=460&v=4'
//   }
// }

const loginData = {
  data: {
    enCodeUser: '6x7J2SsFKzrJIVpG9mkSJtR7FNtMHUEqo1TG%2B3BERz0%3D',
    isAdmin: '1',
    orgId: 'A01',
    orgName: '天房科技',
    pass: null,
    password: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
    phone: null,
    resourceList: [],
    sex: '1',
    showname: '超级管理员',
    superAdmin: '1',
    systemAuthList: [],
    createBy: '超级管理员',
    createTime: '2019-06-10 14:52:45',
    delFlag: '0',
    delFlagName: '0',
    disableFlag: '0',
    disableFlagName: '0',
    icon: 'ybglpy',
    joinType: null,
    joinTypeName: null,
    photo: 'http://192.168.40.100/group1/M00/00/08/wKgoZF0AZ8aAX641AAAE-qlJCb0413.png?attname=3.1_03.png',
    remark: '一报告两评议信息管理系统',
    sysId: '5cfdfbd5e4b0e63e03b8f965',
    sysLevel: null,
    sysName: '一报告两评议',
    sysSort: 3,
    sysUrl: 'ybglpy_cs',
    updateBy: '5cb3d59a89bea9a825c44e46',
    updateTime: '2019-06-12 10:48:07',
    tel: null,
    token: 'eyJhbGciOiJIUzUxMiJ9.eyJDcmVhdGVkVGltZSI6MTU2MjYzMjQ4MzEyMywiZXhwIjoxNTYyNjc1NjgzLCJ1c2VyaWQiOiI1Y2IzZDU5YTg5YmVhOWE4MjVjNDRlNDYifQ.ZnXMc3YAFOFKABhr5CscpIdtNCu--ORo_q46fIK5Ay6ANd1mRjh5ZS1vwnShB5woZ74Lvs3FX_C0P1kTwLGUlg',
    userId: '5cb3d59a89bea9a825c44e46',
    username: 'admin'
  },
  msg: '登录成功',
  status: 20
}

const logoutData = {
  data: null,
  msg: '成功登出',
  status: 20
}

export const login = req => {
  // req = JSON.parse(req.body)
  // return {
  //   token: USER_MAP[req.userName].token
  // }
  return loginData
}

// export const getUserInfo = req => {
//   const params = getParams(req.url)
//   return USER_MAP[params.token]
// }

export const logout = req => {
  return logoutData
}
