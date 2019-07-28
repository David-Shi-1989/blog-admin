import axios from '@/libs/api.request'
// Enum
export const EnumIsSelf = {
  0: '转载',
  1: '原创',
  isSelf (val) {
    return (val === 1)
  }
}

// Action
// 获取文章列表
export const getArticleList = (current, size) => {
  return axios.request({
    url: 'api/article/list?current=' + current + '&' + 'size=' + size,
    method: 'get'
  })
}
// 修改一篇文章的是否原创
export const changeArticleIsSelf = (articleId, isSelf) => {
  return axios.request({
    url: `api/article/${articleId}/is_self`,
    method: 'put',
    data: {isSelf}
  })
}
// 修改一篇文章的是否发布
export const changeArticleIsPublish = (articleId, isSelf) => {
  return axios.request({
    url: `api/article/${articleId}/is_publish`,
    method: 'put',
    data: {isSelf}
  })
}
export const addArticle = (data) => {
  return axios.request({
    url: 'api/article/list',
    method: 'post',
    data
  })
}
export const removeArticle = (idList) => {
  return new Promise(function (resolve, reject) {
    axios.request({
      url: 'api/article/list',
      method: 'delete',
      data: idList
    }).then(res => {
      resolve(res.data.isSuccess && res.data.affectedRows === idList.length)
    })
  })
}
// 获取文章分类列表
export const getArticleClass = (current, size) => {
  return new Promise(function (resolve, reject) {
    axios.request({
      url: `api/article/class?current=${current}&size=${size}`,
      method: 'get'
    }).then(res => {
      if (res.data.isSuccess) {
        resolve(res.data.list)
      } else {
        reject(new Error('获取文字分类失败'))
      }
    })
  })
}
// 新增文章分类
export const addArticleClass = (data) => {
  return axios.request({
    url: 'api/article/class',
    method: 'post',
    data
  })
}
// 删除文章分类
export const removeArticleClass = (data) => {
  return axios.request({
    url: 'api/article/class',
    method: 'delete',
    data
  })
}
// 文章分类重名校验
export const ArticleClassNameRepeat = (name, id) => {
  return new Promise(function (resolve, reject) {
    axios.request({
      url: `api/article/class?class_name=${name}`,
      method: 'get'
    }).then(res => {
      if (id) {
        resolve(res.data.list.filter(item => item.id !== id).length > 0)
      } else {
        resolve(res.data.list.length > 0)
      }
    })
  })
}
