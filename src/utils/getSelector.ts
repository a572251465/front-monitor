/**
 * @author lihh
 * @description 获取selector选择器
 * @param path dom 访问paths
 */
const getSelector = (path: any[]) => {
  // 剔除window 以及document
  return path
    .reverse()
    .filter((el) => el !== window && el !== document)
    .map((el) => {
      let selector

      // 先筛选id
      if (el.id) {
        selector = `#${el.id}`
      } else if (el.className && typeof el.className === 'string') {
        selector =
          '.' +
          el.className
            .split(' ')
            .filter(function (item: string) {
              return !!item
            })
            .join('.')
      } else {
        selector = el.nodeName
      }
      return selector
    })
    .join('')
}

export default (paths: any[]) => {
  if (Array.isArray(paths)) {
    return getSelector(paths)
  }
  return ''
}
