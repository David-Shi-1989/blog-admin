<template>
  <div>
    <pageTable
      :listFunc="listFn"
      :deleteFunc="deleteFn"
      :tableColumn="columns"
      idField="article_id"
      createBtnText="写文章"
      @onCreateBtnClick="onCreateBtnClick"></pageTable>
  </div>
</template>

<script>
import {EnumIsSelf, getArticleList, changeArticleIsSelf, removeArticle} from '../data.js'
import pageTable from '_c/page-table'
export default {
  name: 'article_list',
  components: {pageTable},
  data () {
    return {
      listFn: getArticleList,
      deleteFn: removeArticle,
      columns: [
        { title: '文章名', key: 'article_title', sortable: true },
        { title: '分类', key: 'class_name', sortable: false },
        {
          title: '原创',
          key: 'article_is_self',
          sortable: true,
          render: (h, params) => {
            return h('i-switch', {
              props: {
                value: EnumIsSelf.isSelf(params.row.article_is_self),
                size: 'small'
              },
              on: {
                'on-change': (newValue) => {
                  this.onIsSelfSwitchChange(params.row.article_id, newValue)
                }
              }
            })
          }
        },
        { title: '访问量', key: 'article_read_count', sortable: true, width: 100 },
        { title: '评论量', key: 'article_comment_count', sortable: true, width: 100 },
        {
          title: '发布时间',
          key: 'article_create_time',
          sortable: true,
          width: 200,
          render: (h, params) => {
            var val = (new Date(params.row.article_create_time)).format('yyyy/MM/dd hh:mm:ss')
            return h('span', {}, val)
          }
        },
        {
          title: '操作',
          key: 'action',
          render: (h, params) => {
            let editBtn = h('Button', {
              props: {
                size: 'small',
                type: 'default'
              }
            }, '编辑')
            let removeBtn = h('Button', {
              props: {
                size: 'small',
                type: 'error'
              }
            }, '删除')
            return h('div', [editBtn, removeBtn])
          }
        }
      ]
    }
  },
  methods: {
    handleDelete () {},
    onCreateBtnClick () {
      this.$router.push({name: 'article_create'})
    },
    onIsSelfSwitchChange (id, newValue) {
      if (id && [true, false].includes(newValue)) {
        changeArticleIsSelf(id, newValue).then(res => {
          if (res.data.isSuccess && res.data.affectedRows === 1) {
            this.$Message.success('修改成功')
          } else {
            this.$Message.success('修改失败')
          }
        })
      }
    },
    deleteArticles (idList) {
      return new Promise(function (resolve, reject) {
        removeArticle(idList).then(res => {
          console.log(res)
          resolve(true)
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
