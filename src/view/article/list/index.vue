<template>
  <div>
    <Card>
      <Tabs value="publish" :animated="false">
        <TabPane label="已发布" name="publish">
          <publishList></publishList>
        </TabPane>
        <TabPane label="草稿箱" name="draft"></TabPane>
        <TabPane label="已删除" name="recycle"></TabPane>
      </Tabs>
    </Card>
  </div>
</template>

<script>
import publishList from './list'
export default {
  name: 'article_list_index',
  components: {publishList},
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
