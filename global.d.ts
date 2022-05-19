import { IExtendData, MyPartial } from '@/types.d'

declare global {
  interface Window {
    __self__: {
      projectName: string
      host: string
      logStoreName: string
      extendData?: IExtendData
    }
  }
}

declare global {
  interface XMLHttpRequest {
    logData: MyPartial<{
      method: string
      url: string
      async: boolean
      username: string
      password: string
    }>
  }
}
