import {
  t
} from '../componentsLocale'

export default {
  methods: {
    t (...args) {
      return t.apply(this, args)
    }
  }
}
