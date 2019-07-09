import Mock from 'mockjs'
import {
  login,
  logout
  // getUserInfo
} from './login'
// import {
//   getTableMotion,
//   getTablePersonnel,
//   getTableStep,
//   getDragList,
//   getPersonnelList
// } from './data'

import {
  getCardList,
  getCount
} from './data'
Mock.mock(/\/get_card_list/, getCardList)
Mock.mock(/\/get_count/, getCount)

// 登录相关和获取用户信息
Mock.mock(/\/login$/, login)
// Mock.mock(/\/get_info/, getUserInfo)
Mock.mock(/\/logout$/, logout)
// Mock.mock(/\/get_table_motion/, getTableMotion)
// Mock.mock(/\/get_table_personnel/, getTablePersonnel)
// Mock.mock(/\/get_table_step/, getTableStep)
// Mock.mock(/\/get_drag_list/, getDragList)
// Mock.mock(/\/get_personnel_list/, getPersonnelList)
Mock.mock(/\/save_error_logger/, 'success')

export default Mock
