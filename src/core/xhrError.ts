import Api from '@/api'
import { IErrorType, ISmallErrorType } from '@/types'
import { genReportData } from '@/utils'

/**
 * @author lihh
 * @description xhr 设置
 */
export function injectXhrError() {
  const XmlHttpRequest = window.XMLHttpRequest

  // AOC
  const openBak = XmlHttpRequest.prototype.open
  // 重写open方法
  XmlHttpRequest.prototype.open = function (
    method: string,
    url: string,
    async?: boolean,
    username?: string,
    password?: string
  ) {
    if (!url.match(/logstores/) && !url.match(/sockjs/)) {
      this.logData = {
        method,
        url,
        async,
        username,
        password
      }
    }
    return openBak.call(this, method, url, async || true, username, password)
  }

  const sendBak = XmlHttpRequest.prototype.send
  let startTime: number = 0
  XmlHttpRequest.prototype.send = function (
    body?: Document | XMLHttpRequestBodyInit
  ) {
    // 如果重写了HttpXmlRequest
    if (this.logData) {
      startTime = Date.now()
      const handle = (type: string) => () => {
        const duration = Date.now() - startTime
        const status = this.status
        Api.send(
          genReportData({
            type:
              type === 'load' ? ISmallErrorType.Success : ISmallErrorType.Error,
            errorType: '-',
            eventType: type,
            pathname: this.logData.url,
            status: `${status}`,
            duration: String(duration),
            response: this.response ? JSON.stringify(this.response) : '',
            params: JSON.stringify(body) || ''
          })
        )
      }

      this.addEventListener('load', handle('load'), false)
      this.addEventListener('error', handle('error'), false)
      this.addEventListener('abort', handle('abort'), false)
    }

    sendBak.call(this, body)
  }
}
