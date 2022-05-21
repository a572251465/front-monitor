# logs monitor 前端监控系统
### introduce
- Front end monitoring system 

> the plugin `logs-monitor` data monitoring and data reporting, connection mode of built-in Alibaba node log platform

### monitor content
  - js error
  - promise error
  - XmlHttpRequest error
  - blank screen data
  - webpage monitor data (`connectTime`, `ttfbTime`)

### use way
#### way1
```ts
// step 1
$ pnpm install logs-monitor -S
$ yarn add logs-monitor -S
$ npm install logs-monitor -S

// step 2
import MonitorImpl from 'logs-monitor'

// step 3
const monitor = new MonitorImpl(projectName, host, logStoreName)
monitor.start()
```

#### way2
```js
// step 1
window.__self__ = {
  projectName: xxx,
  host: xxx,
  logStoreName: xxx
}

// step2
<script src = "./dist/monitor.iife.js"></script>

```

### options
- class `MonitorImpl` params
  - projectName  [参照](https://help.aliyun.com/document_detail/31752.html)
  - host [参照](https://help.aliyun.com/document_detail/31752.html)
  - logStoreName [参照](https://help.aliyun.com/document_detail/31752.html)
  - options
    - wrapperSelectors: blank screen monitor reference value. default value - ['body', 'html', '#app']
- method 
  - function `start`. setup method
  - function `setExtend` set the custom attributes of the report 

### monitor value
#### jsError
```json
{
  "title": "前端监控系统",//页面标题
  "url": "http://localhost:8080/",//页面URL
  "timestamp": "1590815288710",//访问时间戳
  "userAgent": "Chrome",//用户浏览器类型
  "kind": "stability",//大类
  "type": "error",//小类
  "errorType": "jsError",//错误类型
  "message": "Uncaught TypeError: Cannot set property 'error' of undefined",//类型详情
  "filename": "http://localhost:8080/",//访问的文件名
  "position": "0:0",//行列信息
  "stack": "btnClick (http://localhost:8080/:20:39)^HTMLInputElement.onclick (http://localhost:8080/:14:72)",//堆栈信息
  "selector": "HTML BODY #container .content INPUT"//选择器
}
```

#### promiseError
```json
{
  "title": "前端监控系统",//页面标题
  "url": "http://localhost:8080/",//页面URL
  "timestamp": "1590815290600",//访问时间戳
  "userAgent": "Chrome",//用户浏览器类型
  "kind": "stability",//大类
  "type": "error",//小类
  "errorType": "promiseError",//错误类型
  "message": "someVar is not defined",//类型详情
  "filename": "http://localhost:8080/",//访问的文件名
  "position": "24:29",//行列信息
  "stack": "http://localhost:8080/:24:29^new Promise (<anonymous>)^btnPromiseClick (http://localhost:8080/:23:13)^HTMLInputElement.onclick (http://localhost:8080/:15:86)",//堆栈信息
  "selector": "HTML BODY #container .content INPUT"//选择器
}
```

#### resourceError
```json
{
  "title": "前端监控系统",//页面标题
  "url": "http://localhost:8080/",//页面URL
  "timestamp": "1590816168643",//访问时间戳
  "userAgent": "Chrome",//用户浏览器类型
  "kind": "stability",//大类
  "type": "error",//小类
  "errorType": "resourceError",//错误类型
  "filename": "http://localhost:8080/error.js",//访问的文件名
  "tagName": "SCRIPT",//标签名
  "timeStamp": "76",//时间
  "selector": "HTML BODY SCRIPT"//选择器
}
```

#### xhrError
```json
{
  "title": "前端监控系统", //标题
  "url": "http://localhost:8080/", //url
  "timestamp": "1590817024490", //timestamp
  "userAgent": "Chrome", //浏览器版本
  "kind": "stability", //大类
  "type": "xhr", //小类
  "eventType": "load", //事件类型
  "pathname": "/success", //路径
  "status": "200-OK", //状态码
  "duration": "7", //持续时间
  "response": "{\"id\":1}", //响应内容
  "params": ""  //参数
}
```

#### blank screen data
```json
{
  "title": "前端监控系统",
  "url": "http://localhost:8080/",
  "timestamp": "1590822618759",
  "userAgent": "chrome",
  "kind": "stability",      //大类
  "type": "blank",          //小类
  "emptyPoints": "0",       //空白点
  "screen": "2049x1152",    //分辨率
  "viewPoint": "2048x994",  //视口
  "selector": "HTML BODY #container" //选择器
}
```

#### web page monitor data
```json
{
  "title": "前端监控系统",
  "url": "http://localhost:8080/",
  "timestamp": "1590828364183",
  "userAgent": "chrome",
  "kind": "experience",
  "type": "timing",
  "connectTime": "0",
  "ttfbTime": "1",
  "responseTime": "1",
  "parseDOMTime": "80",
  "domContentLoadedTime": "0",
  "timeToInteractive": "88",
  "loadTime": "89"
}
```