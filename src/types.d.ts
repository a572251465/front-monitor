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
  Success = 'success'
}

// 变为可选
export type MyPartial<T> = {
  [P in keyof T]?: T[P]
}

// 表示函数ts
export type IFn<T = any> = (...args: T[]) => T

// 表示上报的数模型
export type ISendDataBody = MyPartial<{
  title: string
  url: string
  timestamp: string
  userAgent: string
  kind: IBigErrorType
  type: ISmallErrorType
  errorType: IErrorType | '-'
  message: string
  filename: string
  position: string
  stack: string
  selector: string
  tagName: string
  extendData: string
  eventType: string
  pathname: string
  status: string
  duration: string
  response: string
  params: string
}>

// 表示扩展类型
export type IExtendData = Record<any, any>
