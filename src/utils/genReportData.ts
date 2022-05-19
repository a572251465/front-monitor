import {
  IBigErrorType,
  IErrorType,
  ISendDataBody,
  ISmallErrorType
} from '@/types.d'
import { getExtendData } from '.'

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
  const payload: Record<string, string> = { ...defaultValues, ...info }

  // 进行默认数据获取
  if (!payload.url) payload.url = window.location.href
  if (!payload.timestamp) payload.timestamp = String(+new Date())

  // 设置扩展类型
  if (getExtendData() || (window.__self__ && window.__self__.extendData)) {
    payload.extendData = JSON.stringify(
      getExtendData() || (window.__self__ && window.__self__.extendData)
    )
  }

  const delFieldOptions = {} as Record<string, string>
  for (const key in payload) {
    if (payload[key] === '-') continue
    delFieldOptions[key] = payload[key]
  }
  return delFieldOptions
}
