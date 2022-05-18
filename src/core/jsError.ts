import Api from '@/api'
import { genReportData, getLastEvent, getSelector } from '@/utils'
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
      : ''
  })
  Api.send(sendBody)
}

/**
 * @author lihh
 * @description js监听注入
 */
export function injectJsError() {
  window.addEventListener('error', errorListener, true)
}
