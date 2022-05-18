export { default as genReportData } from './genReportData'
export { default as getLastEvent } from './getLastEvent'
export { default as genLines } from './getLines'
export { default as getSelector } from './getSelector'
export { default as getUserAgent } from './getUserAgent'

/**
 * @author lihh
 * @description 格式化时间
 * @param time 时间
 * @returns
 */
export const formatTime = (time: number) => `${time}`.split('.')[0]
