import {
  IBigErrorType,
  IErrorType,
  ISendDataBody,
  ISmallErrorType
} from '@/types.d'

// 表示默认的监控上报数据
const defaultValues: ISendDataBody = {
  title: '前端监控系统',
  kind: IBigErrorType.Stability,
  type: ISmallErrorType.Error,
  errorType: IErrorType.JsError
}

/**
 * @author lihh
 * @description 用来生成上报的数据
 */
export default (info: ISendDataBody) => {
  // 进行数据合并
  const payload = { ...defaultValues, ...info }

  // 进行默认数据获取
  if (!payload.url) payload.url = window.location.href
  if (!payload.timestamp) payload.timestamp = String(+new Date())

  return payload
}
