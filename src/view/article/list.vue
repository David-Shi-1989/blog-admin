<template>
  <div>
    <Card>
      <Table ref="tables" searchable search-place="top" size="small" :data="tableData" :columns="columns" @on-delete="handleDelete" :height="520"></Table>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'article_list',
  data () {
    return {
      test: false,
      tableData: [
        { name: '文章1', class: '前端', datetime: 1544325734000, isOriginal: true, visitCount: 123, commentCount: 3 },
        { name: '文章2', class: 'NodeJs', datetime: 1544325734000, isOriginal: true, visitCount: 78, commentCount: 21 },
        { name: '文章3', class: '前端', datetime: 1544325734000, isOriginal: false, visitCount: 54, commentCount: 14 },
        { name: '文章4', class: '前端', datetime: 1544325734000, isOriginal: true, visitCount: 12, commentCount: 2 },
        { name: '文章5', class: '前端', datetime: 1544325734000, isOriginal: false, visitCount: 69, commentCount: 0 },
        { name: '文章6', class: '前端', datetime: 1544325734000, isOriginal: true, visitCount: 14, commentCount: 2 },
        { name: '文章7', class: '前端', datetime: 1544325734000, isOriginal: true, visitCount: 68, commentCount: 0 }
      ],
      columns: [
        { title: '文章名', key: 'name', sortable: true },
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
            let month = date.getMonth() + 1
            let day = date.getDate()
            let hour = date.getHours()
            let minute = date.getMinutes()
            let second = date.getSeconds()
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
