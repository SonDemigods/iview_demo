export default {
  methods: {
    nodeFun (key, rule, item) {
      let _key = item[key]
      let font = _key ? rule[_key].font : ''
      let icon = _key ? rule[_key].icon : ''
      let color = _key ? rule[_key].color : ''

      return {
        font,
        icon,
        color
      }
    }
  }
}
