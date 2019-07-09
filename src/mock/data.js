import Mock from 'mockjs'
import {
  doCustomTimes
} from '@/libs/util'
const Random = Mock.Random

export const getTableMotion = req => {
  let tableData = []
  doCustomTimes(6, () => {
    tableData.push(Mock.mock({
      'name|1': ['党委党组', '组织人事部门', '主要领导', '分管领导'],
      'state|1': ['进行中', '完毕'],
      opinion: '@date("yyyy年MM月dd日")',
      proposal: '@date("yyyy年MM月dd日")',
      'cause|1': ['领导班子换届', '届中调整', '机构改革', '任职回避', '工作需要'],
      range: '@cname' + '   ' + '@cname' + '   ' + '@cname' + '   ' + '@cname' + '   ' + '@cname',
      scheme: '@date("yyyy年MM月dd日")',
      intention: '@cname'
    }))
  })
  return {
    data: tableData
  }
}

export const getTablePersonnel = req => {
  let tableData = []
  doCustomTimes(8, () => {
    tableData.push(Mock.mock({
      name: '@cname',
      sex: '@integer(0, 1)',
      birth: '@date("yyyy年MM月dd日")',
      'degree|1': ['本科学位', '硕士', '博士'],
      duties: '副处长',
      rank: '局长',
      level: '主任科员',
      levelTime: '@date("yyyy年MM月dd日")',
      'state|1': ['正常', '退回', '冻结'],
      operator: '@cname',
      time: '@date("yyyy年MM月dd日")',
      'recommend|1': ['不涉及', '定向推荐', '非定向推荐'],
      'voteType|1': ['不涉及', '口头', '举手', '投票', '其他'],
      'statement|1': ['不涉及', '否', '是'],
      'brew|1': ['否', '是'],
      'publicity|1': ['否', '是'],
      id: '12010' + '@integer(1, 9)' + '@date("yyyyMMdd")' + '@integer(1000, 9999)',
      'nation|1': ['汉族', '回族', '藏族', '壮族'],
      address: '@city(true)',
      'face|1': ['共产党员', '群众', '九三学社']
    }))
  })
  return {
    data: tableData
  }
}

export const getTableStep = req => {
  let tableData = []
  doCustomTimes(3, () => {
    tableData.push(Mock.mock({
      name: '@cname',
      sex: '@integer(0, 1)',
      date: '@date("yyyy年MM月dd日")',
      degree: '本科学位',
      duties: '副处长',
      rank: '局长',
      level: '主任科员',
      levelTime: '@date("yyyy年MM月dd日")',
      'state|1': ['正常', '退回', '冻结'],
      operator: '@cname',
      time: '@date("yyyy年MM月dd日")',
      'recommend|1': ['不涉及', '定向推荐', '非定向推荐'],
      'voteType|1': ['不涉及', '口头', '举手', '投票', '其他'],
      'statement|1': ['不涉及', '否', '是'],
      'brew|1': ['否', '是'],
      'publicity|1': ['否', '是'],
      'oneByOne|1': ['否', '是'],
      'number|1': [1, 2, 3, 4, 5, 6, 7],
      'publicityType|1': ['会议公布', '网络公示', '张榜公告'],
      'publicityResult|1': ['无反应', '有反应但不影响使用', '有反应暂停任职程序'],
      meetingName: '和平区二次党组会议',
      reference: '任职文号2018'
    }))
  })
  return {
    data: tableData
  }
}

export const getPersonnelList = req => {
  let tableData = []
  doCustomTimes(20, () => {
    tableData.push(Mock.mock({
      key: '@increment',
      label: '方案' + '@cword("一二三四五六七八九十")' + ' - ' + '@cname'
    }))
  })
  return {
    data: tableData
  }
}

export const getDragList = req => {
  let dragList = []
  doCustomTimes(5, () => {
    dragList.push(Mock.mock({
      name: Random.csentence(10, 13),
      id: Random.increment(10)
    }))
  })
  return {
    data: tableData
  }
}

export const getCardList = req => {
  let cardList = []
  doCustomTimes(8, () => {
    cardList.push(Mock.mock({
      thumbnail_pic_s: Random.dataImage('300x250', 'mock的图片'),
      author_name: Random.cname(),
      'sex|1': ['男', '女'],
      native_place: '天津',
      'nation|1': ['汉族', '回族', '藏族', '壮族'],
      'face|1': ['共产党员', '群众', '九三学社'],
      'position|1': ['书记', '副书记', '主任', '副主任', '检察长', '副检察长', '副主席', '省长', '副省长']
    }))
  })
  return {
    data: cardList
  }
}

export const getCount = req => {
  let countList = []
  doCustomTimes(1, () => {
    countList.push(Mock.mock({
      'a|0-1': 0,
      'count|0-100': 1,
      'positionalTitle': ['初级', '中级', '副高级', '正高级'],
      'postLevel': ['办事员级', '科员级', '副科级', '正科级', '副处级', '正处级'],
      'rank': ['二级科员', '一级科员', '四级主任科员', '三级主任科员', '二级主任科员', '一级主任科员']
    }))
  })
  return {
    data: countList
  }
}
