import { IExtendData } from '@/types.d'

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
