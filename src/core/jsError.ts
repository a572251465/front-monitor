import Api from '@/api'
import { IErrorType } from '@/types.d'
import {
  genLines,
  genReportData,
  getLastEvent,
  getSelector,
  getUserAgent
} from '@/utils'
import getLines from '@/utils/getLines'

/**
 * @author lihh
 * @description 监听error信息
 * @param event 事件对象
 */
const errorListener = (event: ErrorEvent) => {
  // 获取最后一次点击事件
  const lastEvent = getLastEvent()
  const sendBody = genReportData({
    message: event.message,
    filename: event.filename,
    position: `${event.lineno || 0}:${event.colno || 0}`,
    stack: getLines(event.error.stack),
    selector: lastEvent
      ? getSelector((lastEvent as any).path || lastEvent.target)
      : '',
    userAgent: getUserAgent()
  })
  Api.send(sendBody)
}

/**
 * @author lihh
 * @description 监听promise error信息
 * @param event error事件
 */
const promiseErrorListener = (event: PromiseRejectionEvent) => {
  // 初期值
  let message = ''
  let stack = ''
  let position = ''
  let filename = ''

  // 针对不同的promise结果做处理 如果是字符串/ 对象
  if (typeof event.reason === 'string') {
    message = event.reason
  } else if (typeof event.reason === 'object' && event.reason.stack) {
    message = event.reason.message
    const matchArr = event.reason.stack.match(/at\s+(.+):(\d+):(\d+)/)
    filename = matchArr[0]
    message = event.reason.message
    stack = genLines(event.reason.stack)
    position = `${matchArr[2]}:${matchArr[3]}`
  }

  // 获取最后一次点击事件
  const lastEvent = getLastEvent()
  const sendBody = genReportData({
    errorType: IErrorType.PromiseError,
    message,
    filename,
    position,
    stack,
    selector: lastEvent
      ? getSelector((lastEvent as any).path || lastEvent.target)
      : '',
    userAgent: getUserAgent()
  })
  Api.send(sendBody)
}

/**
 * @author lihh
 * @description js监听注入
 */
export function injectJsError() {
  window.addEventListener('error', errorListener, true)
  window.addEventListener('unhandledrejection', promiseErrorListener, true)
}
