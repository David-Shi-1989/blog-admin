<template>
  <div>
    <Modal v-model="isShow" :title="title">
      <div>
        <Icon type="md-bulb" />
        <p>{{text}}</p>
      </div>
      <div slot="footer">
        <Button type="primary" @click="onOkClick">确定</Button>
        <Button type="default" @click="onCancelClick">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'comfirm_modal',
  data () {
    return {
      isShow: false,
      title: '提示',
      text: '请确认',
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

<style>

</style>
