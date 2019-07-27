<template>
  <div>
    <Card>
      <div class="sww-article-class-tree-wrap">
        <Tree :data="data" :render="renderContent"></Tree>
      </div>
    </Card>
    <confirmModal ref="confirmModal"></confirmModal>
  </div>
</template>
<script>
import confirmModal from '_c/confirm'
import {getArticleClass, addArticleClass, removeArticleClass, ArticleClassNameRepeat} from '@/api/data'
export default {
  name: 'article_class_list',
  data () {
    return {
      data: [
        {
          title: '根目录',
          expand: true,
          id: null,
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
          ]
        }
      ],
      buttonProps: {
        type: 'default',
        size: 'small'
      }
    }
  },
  components: {confirmModal},
  created () {
    this.initData()
  },
  methods: {
    initData () {
      getArticleClass(1, 200).then(list => {
        var children = this.handleData(list)
        console.log(children)
        this.$set(this.data[0].children, children)
      })
    },
    handleData (aData) {
      var arr = []
      aData.filter(item => !item.parentId).forEach(item => {
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
        var aArr = aData.filter(item => item.parentId === curId)
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
              data.backup = data.title
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
      var me = this
      this.$refs.confirmModal.confirm({
        title: '删除确认',
        text: '确认删除吗？',
        cb (isOK) {
          if (isOK) {
            removeArticleClass([data.id]).then((res) => {
              if (res.data.isSuccess) {
                me.$Message.success('删除成功')
                me.initData()
              }
            })
          }
        }
      })
    },
    editOK (oData, oNode) {
      var newData = {
        title: oData.title,
        parentId: oData.parentId,
        id: oData.id
      }
      var isCreate = (oData.id !== undefined || oData.id !== null)
      ArticleClassNameRepeat(newData.title, newData.id).then(isRepeat => {
        if (!isRepeat) {
          addArticleClass(newData).then((res) => {
            if (res.data.isSuccess) {
              this.$set(oData, 'id', res.data.id)
              this.$set(oData, 'isEdit', false)
              this.$Message.success(isCreate ? '新建成功' : '编辑成功')
            } else {
              this.$Message.success(isCreate ? '新建失败' : '编辑失败')
            }
          })
        } else {
          this.$Message.error('名称重复')
        }
      })
    },
    editCancel (root, node, data) {
      if (data.id) {
        this.$set(data, 'title', data.backup)
        delete data.backup
        this.$set(data, 'isEdit', false)
      } else {
        const parentKey = root.find(el => el === node).parent
        const parent = root.find(el => el.nodeKey === parentKey).node
        const index = parent.children.indexOf(data)
        parent.children.splice(index, 1)
      }
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
