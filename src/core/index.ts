import { nodeLogsConnectionInfo } from '@/utils'
import { injectJsError } from './jsError'

class MonitorImpl {
  public active: boolean = true
  constructor(
    public projectName: string,
    public host: string,
    public logStoreName: string
  ) {
    projectName = projectName || window.__self__.projectName
    host = host || window.__self__.host
    logStoreName = logStoreName || window.__self__.logStoreName

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
  }
}

export default MonitorImpl
