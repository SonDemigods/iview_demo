import {
  on
} from '@/libs/tools'

const directives = {
  draggable: {
    inserted: (el, binding, vnode) => {
      let triggerDom = document.querySelector(binding.value.trigger)
      triggerDom.style.cursor = 'move'
      let bodyDom = document.querySelector(binding.value.body)
      let pageX = 0
      let pageY = 0
      let transformX = 0
      let transformY = 0
      let canMove = false
      const handleMousedown = e => {
        let transform = /\(.*\)/.exec(bodyDom.style.transform)
        if (transform) {
          transform = transform[0].slice(1, transform[0].length - 1)
          let splitxy = transform.split('px, ')
          transformX = parseFloat(splitxy[0])
          transformY = parseFloat(splitxy[1].split('px')[0])
        }
        pageX = e.pageX
        pageY = e.pageY
        canMove = true
      }
      const handleMousemove = e => {
        let xOffset = e.pageX - pageX + transformX
        let yOffset = e.pageY - pageY + transformY
        if (canMove) bodyDom.style.transform = `translate(${xOffset}px, ${yOffset}px)`
      }
      const handleMouseup = e => {
        canMove = false
      }
      on(triggerDom, 'mousedown', handleMousedown)
      on(document, 'mousemove', handleMousemove)
      on(document, 'mouseup', handleMouseup)
    },
    update: (el, binding, vnode) => {
      if (!binding.value.recover) return
      let bodyDom = document.querySelector(binding.value.body)
      bodyDom.style.transform = ''
    }
  },
  autoHeight: {
    inserted: (el, binding) => {
      el.opt = {
        ...{
          allHeight: 0,
          precent: 100,
          diffHeight: 100
        },
        dataName: binding.arg,
        ...binding.value,
        ...binding.modifiers
      }
      el.autoHeightHandle = function (el, binding) {
        let allH = el.opt.allHeight === 0 ? window.innerHeight : el.opt.allHeight
        let elH = (allH * el.opt.precent / 100) - el.opt.diffHeight
        if (!el.opt.vm && el.opt.dataName) {
          console.error('autoHeight:定义了dataName则必须同时定义vm参数')
          return
        }
        if (el.opt.vm && el.opt.dataName) el.opt.vm[el.opt.dataName] = elH
        if (el.opt.style === true) el.style = `height:${elH}px;overflow-y:auto;`
      }.bind(null, el, binding)
      window.addEventListener('resize', el.autoHeightHandle)
      el.autoHeightHandle()
    },
    update: (el, binding) => {
      el.opt = {
        ...{
          allHeight: 0,
          precent: 100,
          diffHeight: 100
        },
        dataName: binding.arg,
        ...binding.value,
        ...binding.modifiers
      }
      el.autoHeightHandle()
    },
    unbind: (el) => {
      if (el && el.autoHeightHandle) window.removeEventListener('resize', el.autoHeightHandle)
    }
  }
}

export default directives
