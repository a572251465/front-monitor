import { injectJsError } from './jsError'

class MonitorImpl {
  constructor() {}

  start = () => {
    // 监听js执行
    injectJsError()
  }
}

export default MonitorImpl
