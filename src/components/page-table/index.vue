<template>
  <div :class="'sc-cpt-pg-'+identity">
    <div class="sc-pt-btn-wrap">
      <Button v-if="isCreateBtnShow" type="primary" size="small" @click="onCreateBtnClick">
        <i class="ivu-icon ivu-icon-md-add"></i>
        {{createBtnText}}
      </Button>
      <Button v-if="isDeleteBtnShow" type="default" size="small" :disabled="btn.isDeleteBtnDisable" @click="onDeleteBtnClick">
        <i class="ivu-icon ivu-icon-md-close"></i>
        删除
      </Button>
      <Button type="default" size="small" @click="onRefreshBtnClick">
        <i class="ivu-icon ivu-icon-md-refresh"></i>
        刷新
      </Button>
    </div>
    <Table
      ref="tables"
      searchable
      search-place="top"
      size="small"
      :data="tableData"
      :columns="getTableColumn"
      :loading="table.loading"
      @on-selection-change="onTableSelectionChange"
      @on-delete="handleDelete"
      :height="400"></Table>
    <div class="sc-pt-page-wrap" style="height:30px;">
      <Page :total="pageTool.total" :page-size="pageTool.size" size="small" show-total show-elevator show-sizer @on-change="onPageCurrentChange" @on-page-size-change="onPageSizeChange"></Page>
    </div>
    <!-- <confirmModal ref="confirmModal"></confirmModal> -->
  </div>
</template>

<script>
// import confirmModal from '_c/confirm'
export default {
  name: 'cpt_page_table',
  // components: {confirmModal},
  props: {
    listFunc: {
      type: Function
    },
    deleteFunc: {
      type: Function
    },
    idField: {
      type: String,
      default: 'id'
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
      btn: {
        isDeleteBtnDisable: true
      },
      table: {
        loading: false
      },
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
      this.table.loading = true
      this.listFunc(this.pageTool.current, this.pageTool.size).then(res => {
        this.tableData = res.data.list
        this.pageTool.total = res.data.total
        this.table.loading = false
      })
    },
    // table
    onTableSelectionChange (selectionList) {
      this.btn.isDeleteBtnDisable = (selectionList.length === 0)
    },
    // page
    onPageSizeChange (newPageSize) {
      this.pageTool.size = parseInt(newPageSize)
      this.initData()
    },
    onPageCurrentChange (newCurrent) {
      this.pageTool.current = parseInt(newCurrent)
      this.initData()
    },
    // btn
    onCreateBtnClick () {
      this.$emit('onCreateBtnClick')
    },
    onRefreshBtnClick () {
      this.initData()
      this.btn.isDeleteBtnDisable = true
    },
    onDeleteBtnClick () {
      var selectionList = this.$refs.tables.getSelection()
      var me = this
      this.$Confirm.show({
        text: `确认删除选中的${selectionList.length}项吗?`,
        cb (isOK) {
          if (isOK) {
            if (me.deleteFunc) {
              me.deleteFunc(selectionList.map(item => item[me.idField])).then(isOK => {
                if (isOK) {
                  me.$Message.success('删除成功')
                  me.initData()
                } else {
                  me.$Message.error('删除失败')
                }
              })
            }
          }
        }
      })
      // this.$refs.confirmModal.confirm({
      //   title: '确认',
      //   text: `确认删除选中的${selectionList.length}项吗?`,
      //   cb (isOK) {
      //     if (isOK) {
      //       if (me.deleteFunc) {
      //         me.deleteFunc(selectionList.map(item => item[me.idField])).then(isOK => {
      //           if (isOK) {
      //             me.$Message.success('删除成功')
      //             me.initData()
      //           } else {
      //             me.$Message.error('删除失败')
      //           }
      //         })
      //       }
      //     }
      //   }
      // })
    },
    handleDelete () {}
  },
  computed: {
    getTableColumn () {
      return [
        {
          type: 'selection',
          width: 60
        },
        ...this.tableColumn
      ]
    }
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
