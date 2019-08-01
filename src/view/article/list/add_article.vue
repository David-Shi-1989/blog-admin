<template>
  <Card class="sww-card-wrap">
    <div class="sww-header">
      <Row>
        <i-Col span="10">
          <i-Input v-model="article_title">
            <span slot="prepend" style="width:100px;text-align:center;display:inline-block;">标题</span>
          </i-Input>
        </i-Col>
        <i-Col span="3" offset="1">
          <Cascader :data="classList" placeholder="分类" v-model="article_class_id"></Cascader>
        </i-Col>
      </Row>
    </div>
    <div>
      <div class="sww-article-wrap" id="article_editor_container"></div>
      <Button type="primary" @click="onSaveBtnClick">保存</Button>
    </div>
  </Card>
</template>

<script>
import '_s/ueditor/ueditor.config.js'
import '_s/ueditor/ueditor.all.js'
import {getArticleClass, addArticle, getArtile} from '../data'
export default {
  name: 'article_add',
  data () {
    return {
      isCreate: false,
      article_id: null,
      article_title: '',
      classList: [],
      article_class_id: null,
      content: '',
      editor: null
    }
  },
  created () {
    this.isCreate = !(this.$route.query.id && /^[0-9a-zA-Z-]+$/.test(this.$route.query.id))
    if (!this.isCreate) {
      this.article_id = this.$route.query.id
    }
    this.initData()
  },
  mounted () {
    this.renderUEditor()
    if (!this.isCreate) {
      setTimeout(this.getArticleData, 500)
    }
  },
  methods: {
    renderUEditor () {
      this.editor = window.UE.getEditor('article_editor_container', {
        initialFrameHeight: 500,
        scaleEnabled: true
      })
    },
    initData () {
      this.getClassData()
    },
    getArticleData () {
      getArtile(this.article_id).then(res => {
        this.article_title = res.data.article_title
        this.article_class_id = [res.data.article_class_id]
        this.content = res.data.article_content
        this.setEditorContent(this.content)
      })
    },
    getClassData () {
      getArticleClass(1, 200).then(list => {
        this.classList = handlerData(list)
      })
      function handlerData (list) {
        var newList = []
        var idArr = []
        if (list && list.concat) {
          for (let i = 0; i < list.length; i++) {
            newList.push({
              label: list[i].title,
              value: list[i].id,
              parentId: list[i].parentId || null,
              children: []
            })
            idArr.push(list[i].id)
          }
          for (let i = 0; i < newList.length; i++) {
            let curClass = newList[i]
            if (curClass.parentId) {
              let parentNodeIndex = idArr.indexOf(curClass.parentId)
              if (parentNodeIndex > -1) {
                newList[parentNodeIndex].children.push(curClass)
              }
            }
          }
        }
        return newList.filter(item => !item.parentId)
      }
    },
    onSaveBtnClick () {
      // 检查title
      if (!this.article_title) {
        this.$Message.error('文章标题不能少')
        return false
      }
      if (this.content) {
        this.$Message.error('文章内容不能为空')
        return false
      }
      if (!this.article_class_id) {
        this.$Message.error('文章选择分类')
        return false
      }
      addArticle({
        title: this.article_title,
        content: this.getEditorContent(),
        classId: this.article_class_id[this.article_class_id.length - 1]
      }).then(res => {
        if (res.data.isSuccess) {
          this.$Message.success('新建成功')
        }
      })
    },
    getEditorContent () {
      return this.editor.getContent()
    },
    setEditorContent (text) {
      return this.editor.setContent(text)
    }
  },
  beforeDestroy () {
    if (this.editor && this.editor.destroy) {
      this.editor.destroy()
    }
  }
}
</script>

<style scoped>
.sww-card-wrap {
  height: 800px;
}
.sww-header {
  position: relative;
  z-index: 1000;
  margin-bottom: 5px;
}
.sww-article-wrap {
  width: 100%;
}
</style>
