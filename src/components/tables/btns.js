const btns = {
  show: (h, params, vm) => {
    return h('Tooltip', {
      props: {
        content: '查看',
        theme: 'light'
      }
    }, [h('Button', {
      props: {
        type: 'text',
        ghost: true
      },
      style: {
        padding: '4px'
      },
      on: {
        click: () => {
          vm.$emit('on-show', params.index)
        }
      }
    }, [
      h('Icon', {
        props: {
          type: 'md-eye',
          size: 18,
          color: '#2db7f5'
        }
      })
    ])])
  },
  edit: (h, params, vm) => {
    return h('Tooltip', {
      props: {
        content: '编辑',
        theme: 'light'
      }
    }, [h('Button', {
      props: {
        type: 'text',
        ghost: true
      },
      style: {
        padding: '4px'
      },
      on: {
        click: () => {
          vm.$emit('on-edit', params.index)
        }
      }
    }, [
      h('Icon', {
        props: {
          type: 'md-brush',
          size: 18,
          color: '#2d8cf0'
        }
      })
    ])])
  },
  delete: (h, params, vm) => {
    return h('Tooltip', {
      props: {
        content: '删除',
        theme: 'light'
      }
    }, [h('Button', {
      props: {
        type: 'text',
        ghost: true
      },
      style: {
        padding: '4px'
      },
      on: {
        click: () => {
          vm.$emit('on-delete', params.index)
        }
      }
    }, [
      h('Icon', {
        props: {
          type: 'md-trash',
          size: 18,
          color: '#ed4014'
        }
      })
    ])])
  },
  up: (h, params, vm) => {
    return h('Tooltip', {
      props: {
        content: '上移',
        theme: 'light'
      }
    }, [h('Button', {
      props: {
        type: 'text',
        ghost: true
      },
      style: {
        padding: '4px'
      },
      on: {
        click: () => {
          vm.$emit('on-up', params.index)
        }
      }
    }, [
      h('Icon', {
        props: {
          type: 'md-arrow-round-up',
          size: 18,
          color: '#ff9900'
        }
      })
    ])])
  },
  down: (h, params, vm) => {
    return h('Tooltip', {
      props: {
        content: '下移',
        theme: 'light'
      }
    }, [h('Button', {
      props: {
        type: 'text',
        ghost: true
      },
      style: {
        padding: '4px'
      },
      on: {
        click: () => {
          vm.$emit('on-down', params.index)
        }
      }
    }, [
      h('Icon', {
        props: {
          type: 'md-arrow-round-down',
          size: 18,
          color: '#ff9900'
        }
      })
    ])])
  },
  reset: (h, params, vm) => {
    return h('Tooltip', {
      props: {
        content: '重置密码',
        theme: 'light'
      }
    }, [h('Button', {
      props: {
        type: 'text',
        ghost: true
      },
      style: {
        padding: '4px'
      },
      on: {
        click: () => {
          vm.$emit('on-reset-pwd', params.index)
        }
      }
    }, [
      h('Icon', {
        props: {
          type: 'md-lock',
          size: 18,
          color: '#2db7f5'
        }
      })
    ])])
  },
  grant: (h, params, vm) => {
    return h('Tooltip', {
      props: {
        content: '配置角色',
        theme: 'light'
      }
    }, [h('Button', {
      props: {
        type: 'text',
        ghost: true
      },
      style: {
        padding: '4px'
      },
      on: {
        click: () => {
          vm.$emit('on-grant', params.index)
        }
      }
    }, [
      h('Icon', {
        props: {
          type: 'md-build',
          size: 18,
          color: '#ff9900'
        }
      })
    ])])
  }
}

export default btns
