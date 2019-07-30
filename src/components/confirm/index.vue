<template>
  <Modal
    v-model="isShow"
    style="position:relative;z-index:9999;"
    :closable="false"
    :mask-closable="false"
    :width="400"
    class="sww-confirm-modal"
    :on-text="okBtnText"
    :cancel-text="cancelBtnText"
    @on-ok="onOkClick"
    @on-cancel="onCancelClick">
    <div slot="header">
      <div class="ivu-modal-confirm-head-icon ivu-modal-confirm-head-icon-confirm"><Icon type="md-help-circle"></Icon></div>
      <div class="ivu-modal-confirm-head-title">{{title}}</div>
    </div>
    <!-- <div class="sww-confirm-modal-header">
      <Icon type="md-help-circle"></Icon><span>{{title}}</span>
    </div> -->
    <div class="ivu-modal-confirm-body">
      <p>{{text}}</p>
    </div>
    <!-- <div>
      <Icon type="md-bulb" />
      <p>{{text}}</p>
    </div>
    <div slot="footer">
      <Button type="primary" @click="onOkClick">{{okBtnText}}</Button>
      <Button type="default" @click="onCancelClick">{{cancelBtnText}}</Button>
    </div> -->
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
.ivu-modal-mask {
  z-index: 9999;
}
.ivu-modal-wrap {
  z-index: 9999;
}
.sww-confirm-modal >>> .ivu-modal-header {
  border-bottom: 0;
  padding: 0;
}
.sww-confirm-modal >>> .ivu-modal-footer {
  border-top: none !important;
  padding: 0;
}
.sww-confirm-modal >>> .ivu-modal-body {
  padding: 16px 0 20px 0;
}
</style>
