<template>
  <div :class="'sc-cpt-pg-'+identity">
    <div class="sc-pt-btn-wrap">
      <Button v-if="isCreateBtnShow" type="primary" size="small" @click="onCreateBtnClick">
        <i class="ivu-icon ivu-icon-md-add"></i>
        {{createBtnText}}
      </Button>
      <Button v-if="isDeleteBtnShow" type="default" size="small">
        <i class="ivu-icon ivu-icon-md-close"></i>
        删除
      </Button>
      <Button type="default" size="small">
        <i class="ivu-icon ivu-icon-md-refresh"></i>
        刷新
      </Button>
    </div>
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
    },
    createBtnText: {
      type: String,
      default: '新建'
    },
    isCreateBtnShow: {
      type: Boolean,
      default: true
    },
    isDeleteBtnShow: {
      type: Boolean,
      default: true
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
    onCreateBtnClick () {
      this.$emit('onCreateBtnClick')
    },
    handleDelete () {}
  }
}
</script>

<style scoped>
.sc-pt-btn-wrap {
  --btn-height: 26px;
  height: var(--btn-height);
  margin-bottom: 5px;
}
.sc-pt-btn-wrap button {
  display: inline-block;
  height: var(--btn-height);
}
/*分页*/
.sc-pt-page-wrap {
  height: 30px;
  text-align: right;
  margin-top: 10px;
}
</style>
