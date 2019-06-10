<template>
  <div>
    <pageTable
      :listFunc="listFn"
      :tableColumn="columns"
      createBtnText="写文章"
      @onCreateBtnClick="onCreateBtnClick"></pageTable>
  </div>
</template>

<script>
import {getArticleList} from '@/api/data'
import pageTable from '_c/page-table'
export default {
  name: 'article_list',
  components: {pageTable},
  data () {
    return {
      listFn: getArticleList,
      columns: [
        { title: '文章名', key: 'article_title', sortable: true },
        { title: '分类', key: 'article_class_id', sortable: false },
        {
          title: '原创',
          key: 'article_is_self',
          sortable: true,
          render: (h, params) => {
            var val = params.row.article_is_self
            return h('i-switch', {
              props: {
                value: val,
                size: 'small'
              }
            }, val)
          }
        },
        { title: '访问量', key: 'article_read_count', sortable: true },
        { title: '评论量', key: 'article_comment_count', sortable: true },
        {
          title: '发布时间',
          key: 'article_create_time',
          sortable: true,
          render: (h, params) => {
            var val = (new Date(params.row.article_create_time)).format('yyyy/MM/dd hh:mm:ss')
            return h('span', {}, val)
          }
        }
      ]
    }
  },
  methods: {
    handleDelete () {},
    onCreateBtnClick () {
      this.$router.push({name: 'article_create'})
    }
  }
}
</script>

<style scoped>

</style>
