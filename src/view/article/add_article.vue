<template>
  <Card class="sww-card-wrap">
    <div class="sww-header">
      <Row>
        <i-Col span="10">
          <Input v-model="title">
            <span slot="prepend" style="width:100px;text-align:center;display:inline-block;">标题</span>
          </Input>
        </i-Col>
        <i-Col span="3" offset="1">
          <Cascader :data="classList" placeholder="分类" v-model="classId"></Cascader>
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
import {getArticleClass, addArticle} from '@/api/data'
import {isArray} from 'util'
export default {
  name: 'article_add',
  data () {
    return {
      title: '',
      classList: [],
      classId: null,
      editor: null
    }
  },
  created () {
    this.initData()
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
    },
    initData () {
      this.getClassData()
    },
    getClassData () {
      getArticleClass(1, 200).then(list => {
        this.classList = handlerData(list)
      })
      function handlerData (list) {
        var newList = [], idArr = []
        if (list && isArray(list)) {
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
      if (!this.title) {
        this.$Message.error('文章标题不能少')
        return false
      }
      if (this.content) {
        this.$Message.error('文章内容不能为空')
        return false
      }
      if (!this.classId) {
        this.$Message.error('文章选择分类')
        return false
      }
      addArticle({
        title: this.title,
        content: this.getEditorContent(),
        classId: this.classId[this.classId.length - 1]
      }).then(res => {
        if (res.data.isSuccess) {
          this.$Message.success('新建成功')
        }
      })
    },
    getEditorContent () {
      return this.editor.getContent()
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
