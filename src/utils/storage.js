
/* 封装本地存储模块 */
export const setItem = (name,value) => {
  // 如果 value 是对象 转为JSON格式字符串存储 
  if(typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem
  (name,value)
}

export const getItem = name => {
  const data = window.localStorage.getItem(name)
  try {
    return JSON.parse(data)
  } catch(err) {
    return data
  }
}

export const removeItem = name => {
  return window.localStorage.removeItem(name)
}