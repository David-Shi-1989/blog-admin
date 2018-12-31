<template>
  <div>
    <Table ref="tables" searchable search-place="top" size="small" :data="tableData" :columns="tableColumn" @on-delete="handleDelete" :height="520"></Table>
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
      tableData: []
    }
  },
  created () {
    if (this.listFunc) {
      this.listFunc().then(res => {
        this.tableData = res.data.list
      })
    }
  },
  methods: {
    handleDelete () {}
  }
}
</script>

<style scoped>

</style>
