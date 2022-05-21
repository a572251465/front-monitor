type IFn = (...args: any[]) => any
type IMonitorExtend = Partial<{ wrapperSelectors?: string[] }>

declare class MonitorImpl {
  private active: boolean
  constructor(
    projectName?: string,
    host?: string,
    logStoreName?: string,
    options?: IMonitorExtend
  )
  start: IFn
  setExtend: (data: Record<any, any>) => void
}

interface IMonitor {
  new (
    projectName?: string,
    host?: string,
    logStoreName?: string,
    options?: IMonitorExtend
  ): MonitorImpl
}

declare const Instance: IMonitor
export = Instance
