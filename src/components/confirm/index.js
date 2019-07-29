import Confirm from './confirm'

const modeText = {
  delete: {
    text: '确认删除吗？'
  }
}

let confirmInstance
function getInstance () {
  return confirmInstance || Confirm.newInstance()
}
function showConfirm (options) {
  let instance = getInstance()
  instance.show(options)
}

export default {
  name: 'Confirm',
  show (options) {
    return this._show(options)
  },
  delete (options) {
    options.text = modeText.delete.text
    return this._show(options)
  },
  _show (options) {
    return showConfirm(options)
  }
}
