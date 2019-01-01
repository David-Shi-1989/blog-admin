<template>
  <div :class="'sc-cpt-pg-'+identity">
    <Table ref="tables" searchable search-place="top" size="small" :data="tableData" :columns="tableColumn" @on-delete="handleDelete" :height="520"></Table>
    <div class="sc-pt-page-wrap" style="height:30px;">
      <Page :total="pageTool.total" :page-size="pageTool.size" size="small" show-total show-elevator show-sizer @on-change="onPageCurrentChange" @on-page-size-change="onPageSizeChange"></Page>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cpt_page_table',
  props: {
    listFunc: {
      type: Function
    },
    tableColumn: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      identity: ('').random(10),
      tableData: [],
      pageTool: {
        total: 0,
        current: 1,
        size: 20
      }
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      this.listFunc(this.pageTool.current, this.pageTool.size).then(res => {
        this.tableData = res.data.list
        this.pageTool.total = res.data.total
      })
    },
    onPageSizeChange (newPageSize) {
      this.pageTool.size = parseInt(newPageSize)
      this.initData()
    },
    onPageCurrentChange (newCurrent) {
      this.pageTool.current = parseInt(newCurrent)
      this.initData()
    },
    handleDelete () {}
  }
}
</script>

<style scoped>

/*分页*/
.sc-pt-page-wrap {
  height: 30px;
  text-align: right;
  margin-top: 10px;
}
</style>
