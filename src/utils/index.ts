import { IExtendData, IMonitorExtend } from '@/types'

export { default as genReportData } from './genReportData'
export { default as getLastEvent } from './getLastEvent'
export { default as genLines } from './getLines'
export { default as getSelector } from './getSelector'
export { default as getUserAgent } from './getUserAgent'
export { default as onload } from './onload'

// 表示当前的扩展类型
let currentExtendData: IExtendData
// 表示扩展参数
let currentConstructorExtendOptions = {} as IMonitorExtend

/**
 * @author lihh
 * @description 格式化时间
 * @param time 时间
 * @returns
 */
export const formatTime = (time: number) => `${time}`.split('.')[0]

/**
 * @author lihh
 * @description node log 连接信息
 */
export const nodeLogsConnectionInfo = {
  projectName: '',
  host: '',
  logStoreName: '',
  active: false
}

/**
 * @author lihh
 * @description 设置以及获取扩展类型
 */
export const getExtendData = () => currentExtendData
export const setExtendData = (data: IExtendData) => (currentExtendData = data)

/**
 * @author lihh
 * @description 设置构造类型扩展参数
 * @returns
 */
export const getConstructorExtendOptions = () => currentConstructorExtendOptions
export const setConstructorExtendOptions = (data: IMonitorExtend) => {
  currentConstructorExtendOptions = {
    ...currentConstructorExtendOptions,
    ...data
  }
}
