/**
 * @author lihh
 * @description 进行错误消息 换行剔除
 * @param stack 栈信息
 */
export default (stack: string) => {
  if (!stack) return ''

  return stack
    .split('\n')
    .slice(1)
    .map((item) => item.replace(/^\s+at\s+/g, ''))
    .join('^')
}
