// 表示请求错误类型
export enum IErrorType {
  JsError = 'jsError',
  PromiseError = 'promiseError',
  ResourceError = 'resourceError',
  XhrError = 'xhrError'
}

export enum ISuccessType {
  XhrSuccess = 'xhrSuccess'
}

// 表示错误的大分类
export enum IBigErrorType {
  Stability = 'stability'
}

// 表示错误的小分类
export enum ISmallErrorType {
  Error = 'error',
  Success = 'success',
  Blank = 'blank'
}

// 变为可选
export type MyPartial<T> = {
  [P in keyof T]?: T[P]
}

// 表示函数ts
export type IFn<T = any> = (...args: T[]) => T

// 表示上报的数模型
export type ISendDataBody = MyPartial<{
  title: string // 标题
  url: string // 访问的url
  timestamp: string // 时间戳
  userAgent: string // 浏览器
  kind: IBigErrorType // 大分类
  type: ISmallErrorType // 小分类
  errorType: IErrorType | '-' // 错误类型
  message: string // 提示错误消息
  filename: string // 文件名称
  position: string // 错误的代码位置
  stack: string // 错误的调用栈
  selector: string // dom 相关的选择器
  tagName: string // dom 相关的标签名称
  extendData: string // 扩展字段
  eventType: string // xhr 触发事件类型
  pathname: string
  status: string // xhr响应状态
  duration: string // xhr请求花费时间
  response: string // xhl响应内容
  params: string
  emptyPoints: string // 表示空白节点
  screen: string // 表示分辨率大小
  viewPoint: string // 表示视口大小
}>

// 表示扩展类型
export type IExtendData = Record<any, any>
