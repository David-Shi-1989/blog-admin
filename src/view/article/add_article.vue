<template>
  <Card>
    <h2>写个文章吧</h2>
    <div class="sc-article-wrap" id="article_editor_container"></div>
  </Card>
</template>

<script>
import '_s/ueditor/ueditor.config.js'
import '_s/ueditor/ueditor.all.min.js'
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
      this.editor = UE.getEditor('article_editor_container')
    }
  }
}
</script>

<style scoped>

</style>
