<template>
  <div>
    <Card>
      <div class="sww-article-class-tree-wrap">
        <Tree :data="data" :render="renderContent"></Tree>
      </div>
    </Card>
  </div>
</template>

<script>
import {getArticleClass, addArticleClass} from '@/api/data'
export default {
  name: 'article_class_list',
  data () {
    return {
      data: [
        {
          title: '根目录',
          expand: true,
          id: -1,
          render: (h, { root, node, data }) => {
            return h('span', {
              style: {
                display: 'inline-block',
                width: '100%'
              }
            }, [
              h('span', [
                h('Icon', {
                  props: {
                    type: 'ios-folder-outline'
                  },
                  style: {
                    marginRight: '8px'
                  }
                }),
                h('span', data.title)
              ]),
              h('span', {
                style: {
                  display: 'inline-block',
                  float: 'right',
                  marginRight: '32px'
                }
              }, [
                h('Button', {
                  props: Object.assign({}, this.buttonProps, {
                    icon: 'ios-add',
                    type: 'primary'
                  }),
                  style: {
                    width: '64px'
                  },
                  on: {
                    click: () => { this.append(data) }
                  }
                })
              ])
            ])
          },
          children: [
            // {
            //   title: 'child 1-1',
            //   expand: true,
            //   children: [
            //     {
            //       title: 'leaf 1-1-1',
            //       expand: true
            //     },
            //     {
            //       title: 'leaf 1-1-2',
            //       expand: true
            //     }
            //   ]
            // },
            // {
            //   title: 'child 1-2',
            //   expand: true,
            //   children: [
            //     {
            //       title: 'leaf 1-2-1',
            //       expand: true
            //     },
            //     {
            //       title: 'leaf 1-2-1',
            //       expand: true
            //     }
            //   ]
            // }
          ]
        }
      ],
      buttonProps: {
        type: 'default',
        size: 'small'
      }
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      getArticleClass().then((res) => {
        var children = this.handleData(res.data.list)
        this.$set(this.data[0].children, children)
      })
    },
    handleData (aData) {
      var arr = []
      aData.filter(item => item.parentId < 0).forEach(item => {
        arr.push(getItem(item))
      })
      this.data[0].children = arr
      function getItem (curItem) {
        var curId = curItem.id
        var obj = {
          id: curId,
          title: curItem.title,
          expand: true
        }
        var aArr = aData.filter(item => item.parentId == curId)
        if (aArr.length > 0) {
          obj.children = []
          for (let i = 0; i < aArr.length; i++) {
            obj.children.push(getItem(aArr[i]))
          }
        }
        return obj
      }
      return arr
    },
    renderContent (h, { root, node, data }) {
      var isEditMode = (data.isEdit === true)
      var arr = []
      var titleSpan = h('span', {}, [
        h('Icon', {
          props: {
            type: 'ios-paper-outline'
          },
          style: {
            marginRight: '8px'
          }
        }),
        h('span', {
          on: {
            dblclick: (evt) => {
              this.$set(data, 'isEdit', true)
            }
          }
        }, data.title)
      ])
      var eidtSpan = h('span', {}, [
        h('Icon', {
          props: {
            type: 'ios-paper-outline'
          },
          style: {
            marginRight: '8px'
          }
        }),
        h('i-Input', {
          props: {
            // 'v-model': data.title,
            value: data.title,
            size: 'small'
          },
          style: {
            width: '120px'
          },
          on: {
            'on-change': (evt) => {
              this.$set(data, 'title', evt.target.value)
            }
          }
        })
      ])
      var addRemoveButton = h('span', {
        style: {
          display: 'inline-block',
          float: 'right',
          marginRight: '32px'
        }
      }, [
        h('Button', {
          props: Object.assign({}, this.buttonProps, {
            icon: 'ios-add'
          }),
          style: {
            marginRight: '8px'
          },
          on: {
            click: () => { this.append(data) }
          }
        }),
        h('Button', {
          props: Object.assign({}, this.buttonProps, {
            icon: 'ios-remove'
          }),
          on: {
            click: () => { this.remove(root, node, data) }
          }
        })
      ])
      var editButton = h('span', {
        style: {
          display: 'inline-block',
          float: 'right',
          marginRight: '32px'
        }
      }, [
        h('Button', {
          props: Object.assign({}, this.buttonProps, {
            icon: 'ios-checkmark'
          }),
          style: {
            marginRight: '8px'
          },
          on: {
            click: () => { this.editOK(data, node) }
          }
        }),
        h('Button', {
          props: Object.assign({}, this.buttonProps, {
            icon: 'ios-close'
          }),
          on: {
            click: () => { this.editCancel(root, node, data) }
          }
        })
      ])
      if (isEditMode) {
        arr = [eidtSpan, editButton]
      } else {
        arr = [titleSpan, addRemoveButton]
      }
      return h('span', {
        style: {
          display: 'inline-block',
          width: '100%'
        }
      }, arr)
    },
    append (data) {
      const children = data.children || []
      children.push({
        title: 'appended node',
        expand: true,
        isEdit: true,
        parentId: data.id
      })
      this.$set(data, 'children', children)
    },
    remove (root, node, data) {
      const parentKey = root.find(el => el === node).parent
      const parent = root.find(el => el.nodeKey === parentKey).node
      const index = parent.children.indexOf(data)
      parent.children.splice(index, 1)
    },
    editOK (oData, oNode) {
      var newData = {
        title: oData.title,
        parentId: oData.parentId
      }
      // this.$set(oData, 'isEdit', false)
      addArticleClass(newData).then((res) => {
        if (res.data.isSuccess) {
          this.$set(oData, 'id', res.data.id)
          this.$set(oData, 'isEdit', false)
          this.$Message.success('添加成功')
        } else {
          this.$Message.success('添加失败')
        }
      })
    },
    editCancel () {

    }
  }
}
</script>

<style scoped>
.sww-article-class-tree-wrap {
  height: 600px;
  width: 350px;
  box-sizing: border-box;
  padding: 6px;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: #fafafa;
}
</style>
