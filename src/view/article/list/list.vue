<template>
  <div>
    <pageTable
      ref="pagetable"
      class="article-list-table"
      :listFunc="listFn"
      :deleteFunc="deleteFn"
      :tableColumn="columns"
      idField="article_id"
      createBtnText="写文章"
      @onCreateBtnClick="onCreateBtnClick"></pageTable>
  </div>
</template>

<script>
import {EnumIsSelf, getArticleList, changeArticleIsPublish, removeArticle} from '../data.js'
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
          title: '发布',
          key: 'article_is_publish',
          sortable: true,
          render: (h, params) => {
            return h('i-switch', {
              props: {
                value: EnumIsSelf.isSelf(params.row.article_is_publish),
                size: 'small'
              },
              on: {
                'on-change': (newValue) => {
                  this.onIsPublishSwitchChange(params.row.article_id, newValue)
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
            let editIcon = h('i', {
              class: {
                'fa': true,
                'fa-pencil': true
              },
              style: {
                color: '#555',
                fontSize: '14px',
                cursor: 'pointer'
              }
            })
            let editLink = h('router-link', {
              attrs: {
                title: '编辑',
                to: `/article/edit?id=${params.row.article_id}`
              },
              style: {
                marginRight: '10px'
              }
            }, [editIcon])
            let removeIcon = h('i', {
              class: {
                'fa': true,
                'fa-remove': true
              },
              style: {
                fontSize: '14px',
                cursor: 'pointer'
              },
              attrs: {
                title: '删除'
              },
              on: {
                click: () => {
                  this.onRowDeleteBtn(params.row)
                }
              }
            })
            return h('div', [editLink, removeIcon])
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
    onIsPublishSwitchChange (id, newValue) {
      if (id && [true, false].includes(newValue)) {
        changeArticleIsPublish(id, newValue).then(res => {
          if (res.data.isSuccess && res.data.affectedRows === 1) {
            this.$Message.success('修改成功')
          } else {
            this.$Message.success('修改失败')
          }
        })
      }
    },
    onRowDeleteBtn (row) {
      var me = this
      this.$Confirm.delete({
        text: `确认删除【${row.article_title}】吗？`,
        cb: isOK => {
          if (isOK) {
            me.deleteArticles([row.article_id]).then(isSuccess => {
              if (isSuccess) {
                me.$refs.pagetable.initData()
              }
            })
          }
        }
      })
    },
    deleteArticles (idList) {
      return new Promise(function (resolve, reject) {
        removeArticle(idList).then(res => {
          resolve(true)
        })
      })
    }
  }
}
</script>

<style scoped>
</style>
