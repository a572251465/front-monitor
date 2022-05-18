let lastEvent: Event
;[
  'click',
  'pointerdown',
  'touchstart',
  'mousedown',
  'keydown',
  'mouseover'
].forEach((event) => {
  document.addEventListener(
    event,
    (event) => {
      lastEvent = event
    },
    {
      // capture 控制监听器是在捕获阶段执行还是在冒泡阶段执行
      capture: true,
      // passive 的意思是顺从的，表示它不会对事件的默认行为说 no
      passive: true
    }
  )
})

/**
 * @author lihh
 * @description 通过事件冒泡 监听最后触发的事件
 */
export default () => {
  return lastEvent
}
