import Confirm from './index.vue'
import Vue from 'vue'

export const defaultProps = {
  title: '请确认',
  text: '确认此操作吗？',
  okBtnText: '确认',
  cancelBtnText: '取消',
  cb: isOK => {
    console.log(isOK)
  }
}

Confirm.newInstance = properties => {
  const _props = properties || {}

  const Instance = new Vue({
    render (h) {
      return h(Confirm, {props: _props})
    }
  })

  const component = Instance.$mount()
  document.body.appendChild(component.$el)
  const confirmEl = Instance.$children[0]

  return {
    show (noticeProps) {
      let options = $.extend({}, defaultProps, noticeProps)
      for (let key in defaultProps) {
        confirmEl[key] = options[key]
      }
      confirmEl.isShow = true
    },
    component: confirmEl,
    destory (element) {
      setTimeout(function () {
        document.body.removeChild(document.getElementsByClassName(element)[0])
      }, 500)
    }
  }
}

export default Confirm
