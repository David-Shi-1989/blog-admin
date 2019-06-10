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
        { title: '文章名', key: 'title', sortable: true },
        { title: '分类', key: 'class', sortable: false },
        {
          title: '原创',
          key: 'isOriginal',
          sortable: true,
          render: (h, params) => {
            var val = params.row.isOriginal
            return h('i-switch', {
              props: {
                value: val,
                size: 'small'
              }
            }, val)
          }
        },
        { title: '访问量', key: 'visitCount', sortable: true },
        { title: '评论量', key: 'commentCount', sortable: true },
        {
          title: '发布时间',
          key: 'datetime',
          sortable: true,
          render: (h, params) => {
            var val = (new Date(params.row.datetime)).format('yyyy/MM/dd hh:mm:ss')
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
