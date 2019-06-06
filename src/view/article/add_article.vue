<template>
  <Card class="sww-card-wrap">
    <div class="sww-header">
      <Input v-model="value11">
        <span slot="prepend" style="width:100px;text-align:center;display:inline-block;">文章标题</span>
      </Input>
    </div>
    <div class="sww-article-wrap" id="article_editor_container"></div>
    <Button type="primary">保存</Button>
  </Card>
</template>

<script>
import '_s/ueditor/ueditor.config.js'
import '_s/ueditor/ueditor.all.js'
export default {
  name: 'article_add',
  data () {
    return {
      editor: null
    }
  },
  mounted () {
    this.renderUEditor()
  },
  methods: {
    renderUEditor () {
      this.editor = UE.getEditor('article_editor_container', {
        initialFrameHeight: 500,
        scaleEnabled: true
      })
    }
  }
}
</script>

<style scoped>
.sww-card-wrap {
  height: 800px;
}
.sww-header {
  margin-bottom: 5px;
}
.sww-article-wrap {
  width: 100%;
  height: 450px;
}
</style>
