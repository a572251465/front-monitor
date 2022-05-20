import { IFn } from '@/types'

export default function (callback: IFn) {
  if (document.readyState === 'complete') {
    callback()
  } else {
    window.addEventListener('load', callback)
  }
}
