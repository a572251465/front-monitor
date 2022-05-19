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
    .join(' -> ')
}

export default (pathsOrTarget: any[] | object) => {
  if (Array.isArray(pathsOrTarget)) {
    return getSelector(pathsOrTarget)
  }
  const paths = []
  let element = pathsOrTarget
  while (element) {
    paths.push(element)
    element = (element as any).parentNode
  }
  return getSelector(paths)
}
