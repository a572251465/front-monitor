import { IFn, ISendDataBody } from '@/types'
import { nodeLogsConnectionInfo } from '@/utils'
import types from 'where-type'

/**
 * @author lihh
 * @description 发送上报数据
 * @alias http://front-monitor-lihh.cn-beijing.log.aliyuncs.com/logstores/screen-offline-plus/track
 * @param logs 传递的信息
 * @param callback 上报成功的回调
 */
const send = (logs: ISendDataBody, callback?: IFn) => {
  // 判断是否激活
  if (!nodeLogsConnectionInfo.active) return

  const { projectName, host, logStoreName } = nodeLogsConnectionInfo
  const body = JSON.stringify({
    __logs__: [logs]
  })

  // 建立连接
  const xhr = new XMLHttpRequest()
  xhr.open(
    'POST',
    `http://${projectName}.${host}/logstores/${logStoreName}/track`,
    true
  )
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
  xhr.setRequestHeader('x-log-apiversion', '0.6.0')
  xhr.setRequestHeader('x-log-bodyrawsize', `${body.length}`)

  xhr.onload = () => {
    if ((xhr.status >= 200 && xhr.status <= 300) || xhr.status === 304) {
      callback && types.isFunction(callback) && callback()
    }
  }

  xhr.send(body)
}

const Api = { send }
export default Api
