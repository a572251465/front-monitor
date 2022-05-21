import Api from '@/api'
import { ISmallErrorType } from '@/types'
import { genReportData, getConstructorExtendOptions, onload } from '@/utils'

/**
 * @author lihh
 * @description 选择外层元素
 * @param element 选择的元素
 * @returns
 */
function getSelector(element: Element) {
  let selector

  if (element.id) {
    selector = `#${element.id}`
  } else if (element.className && typeof element.className === 'string') {
    selector =
      '.' +
      element.className
        .split(' ')
        .filter(function (item) {
          return !!item
        })
        .join('.')
  } else {
    selector = element.nodeName.toLowerCase()
  }
  return selector
}

export const blankScreen = () => {
  const wrapperSelectors = getConstructorExtendOptions().wrapperSelectors || [
    'body',
    'html',
    '#app'
  ]
  let emptyPoints = 0

  /**
   * @author lihh
   * @description 是否存在空白节点
   * @param element 选择的元素
   */
  function isWrapper(element: Element) {
    const selector = getSelector(element)
    if (wrapperSelectors.indexOf(selector) >= 0) emptyPoints++
  }

  onload(function () {
    let xElements: Element[]
    let yElements: Element[]

    for (let i = 0; i <= 9; i += 1) {
      xElements = document.elementsFromPoint(
        (window.innerWidth * i) / 10,
        window.innerHeight / 2
      )
      yElements = document.elementsFromPoint(
        window.innerWidth / 2,
        (window.innerHeight * i) / 10
      )
      isWrapper(xElements[0])
      isWrapper(yElements[0])
    }

    if (emptyPoints > 6) {
      const centerElements = document.elementsFromPoint(
        window.innerWidth / 2,
        window.innerHeight / 2
      )
      Api.send(
        genReportData({
          type: ISmallErrorType.Blank,
          errorType: '-',
          emptyPoints: String(emptyPoints),
          screen: `${window.screen.width} * ${window.screen.height}`,
          viewPoint: `${window.innerWidth} * ${window.innerHeight}`,
          selector: getSelector(centerElements[0])
        })
      )
    }
  })
}
