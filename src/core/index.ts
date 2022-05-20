import { IExtendData } from '@/types'
import { nodeLogsConnectionInfo, setExtendData } from '@/utils'
import { blankScreen } from './blankScreen'
import { injectJsError } from './jsError'
import { injectXhrError } from './xhrError'

if (import.meta.env.DEV) {
  window.__self__ = {
    projectName: 'front-monitor-lihh',
    logStoreName: 'logs-monitor-test',
    host: 'cn-beijing.log.aliyuncs.com'
  }
}

class MonitorImpl {
  public active: boolean = true
  constructor(
    public projectName?: string,
    public host?: string,
    public logStoreName?: string
  ) {
    projectName =
      projectName || (window.__self__ && window.__self__.projectName)
    host = host || (window.__self__ && window.__self__.host)
    logStoreName =
      logStoreName || (window.__self__ && window.__self__.logStoreName)

    if (!projectName || !host || !logStoreName) {
      console.warn(
        `field<projectName><host><logStoreName> must exist value, setup fail`
      )
      this.active = false
    }
    nodeLogsConnectionInfo.projectName = projectName
    nodeLogsConnectionInfo.host = host
    nodeLogsConnectionInfo.logStoreName = logStoreName
    nodeLogsConnectionInfo.active = true
  }

  /**
   * @author lihh
   * @description 项目启动
   * @returns
   */
  start = () => {
    if (!this.active) return
    // 监听js执行
    injectJsError()
    injectXhrError()
    blankScreen()
  }

  /**
   * @author lihh
   * @description 设置当前扩展类型
   * @param data 扩展的类型
   */
  setExtend = (data: IExtendData) => {
    setExtendData(data)
  }
}

export default MonitorImpl
