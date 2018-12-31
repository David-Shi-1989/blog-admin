<template>
  <div>
    <pageTable :listFunc="listFn" :tableColumn="columns"></pageTable>
  </div>
</template>

<script>
import {getArticle} from '@/api/data'
import pageTable from '_c/page-table'
export default {
  name: 'article_list',
  components: {pageTable},
  data () {
    return {
      listFn: getArticle,
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
            var val = this.getDatetime(params.row.datetime)
            return h('span', {}, val)
          }
        }
      ]
    }
  },
  methods: {
    handleDelete () {},
    getDatetime (timestamp) {
      var result = ''
      if (timestamp && !isNaN(timestamp)) {
        try {
          let date = new Date(timestamp)
          if (date) {
            let year = date.getFullYear()
            let month = (date.getMonth() + 1 > 10) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))
            let day = date.getDay() > 10 ? date.getDay() : ('0' + date.getDay())
            let hour = date.getHours() > 10 ? date.getHours() : ('0' + date.getHours())
            let minute = date.getMinutes() > 10 ? date.getMinutes() : ('0' + date.getMinutes())
            let second = date.getSeconds() > 10 ? date.getSeconds() : ('0' + date.getSeconds())
            result = year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second
          }
        } catch (e) {
          console.warn(e)
        }
      }
      return result
    }
  }
}
</script>

<style scoped>

</style>
