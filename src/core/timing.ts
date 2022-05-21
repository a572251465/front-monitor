import Api from '@/api'
import { IBigErrorType, ISmallErrorType } from '@/types'
import { formatTime, genReportData, onload } from '@/utils'

/**
 * @author lihh
 * @description 性能体验数据
 */
export function timing() {
  // FMP monitor
  let FMP: PerformanceEntry
  let LCP: PerformanceEntry
  new PerformanceObserver((entryList, observer) => {
    let perfEntries = entryList.getEntries()
    FMP = perfEntries[0]
    observer.disconnect()
  }).observe({ entryTypes: ['element'] })

  // LCP monitor
  new PerformanceObserver((entryList, observer) => {
    const perfEntries = entryList.getEntries()
    const lastEntry = perfEntries[perfEntries.length - 1]
    LCP = lastEntry
    observer.disconnect()
  }).observe({ entryTypes: ['largest-contentful-paint'] })

  onload(function () {
    const timer = setTimeout(() => {
      const {
        fetchStart,
        connectStart,
        connectEnd,
        requestStart,
        responseStart,
        responseEnd,
        domLoading,
        domInteractive,
        domContentLoadedEventStart,
        domContentLoadedEventEnd,
        loadEventStart
      } = performance.timing

      Api.send(
        genReportData({
          errorType: '-',
          kind: IBigErrorType.Experience,
          type: ISmallErrorType.Timing,
          // tcp 链接耗时
          connectTime: String(connectEnd - connectStart),
          // ttfb 耗时
          ttfbTime: String(responseStart - requestStart),
          // 响应时间
          responseTime: String(responseEnd - responseStart),
          parseDOMTime: String(loadEventStart - domLoading),
          domContentLoadedTime: String(
            domContentLoadedEventEnd - domContentLoadedEventStart
          ),
          // 首次可交互时间
          timeToInteractive: String(domInteractive - fetchStart),
          loadTime: String(loadEventStart - fetchStart)
        })
      )

      const FP = performance.getEntriesByName('first-paint')[0]
      const FCP = performance.getEntriesByName('first-contentful-paint')[0]
      Api.send(
        genReportData({
          kind: IBigErrorType.Experience,
          type: ISmallErrorType.Paint,
          errorType: '-',
          firstPaint: FP ? formatTime(FP.startTime) : '0',
          firstContentPaint: FCP ? formatTime(FCP.startTime) : '0',
          firstMeaningfulPaint: FMP ? formatTime(FMP.startTime) : '0',
          largestContentfulPaint: LCP
            ? formatTime((LCP as any).renderTime || (LCP as any).loadTime)
            : '0'
        })
      )

      clearTimeout(timer)
    }, 3000)
  })
}
