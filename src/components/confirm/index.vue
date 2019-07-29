<template>
  <Modal v-model="isShow" :title="title" style="position:relative;z-index:9999;">
    <div>
      <Icon type="md-bulb" />
      <p>{{text}}</p>
    </div>
    <div slot="footer">
      <Button type="primary" @click="onOkClick">{{okBtnText}}</Button>
      <Button type="default" @click="onCancelClick">{{cancelBtnText}}</Button>
    </div>
  </Modal>
</template>

<script>
import {defaultProps} from './confirm.js'
export default {
  name: 'comfirm_modal',
  data () {
    return {
      isShow: true,
      title: defaultProps.title,
      text: defaultProps.text,
      okBtnText: defaultProps.title,
      cancelBtnText: defaultProps.title,
      cb: null
    }
  },
  methods: {
    confirm ({title, text, cb}) {
      if (title) {
        this.title = title
      }
      if (text) {
        this.text = text
      }
      if (cb) {
        this.cb = cb
      }
      this.isShow = true
    },
    onOkClick () {
      this.isShow = false
      this.cb(true)
    },
    onCancelClick () {
      this.isShow = false
      this.cb(false)
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
.sww-mask {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
