type IFn = (...args: any[]) => any

declare class MonitorImpl {
  private active: boolean
  constructor(projectName?: string, host?: string, logStoreName?: string)
  start: IFn
  setExtend: (data: Record<any, any>) => void
}

interface IMonitor {
  new (projectName?: string, host?: string, logStoreName?: string): MonitorImpl
}

declare const Instance: IMonitor
export = Instance
