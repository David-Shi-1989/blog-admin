import axios from '@/libs/api.request'

export const getTableData = () => {
  return axios.request({
    url: 'get_table_data',
    method: 'get'
  })
}

export const getDragList = () => {
  return axios.request({
    url: 'get_drag_list',
    method: 'get'
  })
}

export const errorReq = () => {
  return axios.request({
    url: 'error_url',
    method: 'post'
  })
}

export const saveErrorLogger = info => {
  return axios.request({
    url: 'save_error_logger',
    data: info,
    method: 'post'
  })
}

export const uploadImg = formData => {
  return axios.request({
    url: 'image/upload',
    data: formData
  })
}

export const getOrgData = () => {
  return axios.request({
    url: 'get_org_data',
    method: 'get'
  })
}

export const getArticle = (current, size) => {
  return axios.request({
    url: 'api/article/list?current=' + current + '&' + 'size=' + size,
    method: 'get'
  })
}
// 获取article class
export const getArticleClass = (current, size) => {
  return axios.request({
    url: `api/article/class?current=${current}&size=${size}`,
    method: 'get'
  })
}

// 新增article class
export const addArticleClass = (data) => {
  return axios.request({
    url: 'api/article/class',
    method: 'post',
    data
  })
}
// 删除article class
export const removeArticleClass = (data) => {
  return axios.request({
    url: 'api/article/class',
    method: 'delete',
    data
  })
}
// article class重名校验
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
