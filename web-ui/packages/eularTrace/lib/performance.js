import { emit } from './base';

// 兼容判断
const supported = {
  performance: !!window.performance,
  getEntriesByType: !!(window.performance && performance.getEntriesByType),
  PerformanceObserver: 'PerformanceObserver' in window,
  MutationObserver: 'MutationObserver' in window,
  PerformanceNavigationTiming: 'PerformanceNavigationTiming' in window,
};

/**
 * 格式化性能记录,小数位数保留最多两位,等于0的字段不传输,标记为undefined
 */
function normalizePerformanceRecord(e) {
  Object.keys(e).forEach((p) => {
    const v = e[p];
    if (typeof v === 'number') e[p] = v === 0 ? undefined : parseFloat(v.toFixed(2));
  });
  return e;
}

/**
 * 发送首次页面性能数据
 */
function observeNavigationTiming() {
  const times = {};
  const { performance } = window;
  let t = performance.timing;

  times.fmp = 0; // 首屏时间 (渲染节点增量最大的时间点)
  if (supported.getEntriesByType) {
    const paintEntries = performance.getEntriesByType('paint');
    if (paintEntries.length) times.fmp = paintEntries[paintEntries.length - 1].startTime;

    // 优先使用 navigation v2  https://www.w3.org/TR/navigation-timing-2/
    if (supported.PerformanceNavigationTiming) {
      const nt2Timing = performance.getEntriesByType('navigation')[0];
      if (nt2Timing) t = nt2Timing;
    }
  }

  // 从开始发起这个页面的访问开始算起,减去重定向跳转的时间,在performanceV2版本下才进行计算,v1版本的fetchStart是时间戳而不是相对于访问起始点的相对时间
  if (times.fmp && supported.PerformanceNavigationTiming) times.fmp -= t.fetchStart;

  // 白屏时间 (从请求开始到浏览器开始解析第一批HTML文档字节的时间差)
  // times.fpt = t.responseEnd - t.fetchStart;

  times.tti = t.domInteractive - t.fetchStart; // 首次可交互时间

  times.ready = t.domContentLoadedEventEnd - t.fetchStart; // HTML加载完成时间

  times.loadon = t.loadEventStart - t.fetchStart; // 页面完全加载时间

  times.firstbyte = t.responseStart - t.domainLookupStart; // 首包时间

  times.dns = t.domainLookupEnd - t.domainLookupStart; // dns查询耗时

  times.appcache = t.domainLookupStart - t.fetchStart; // dns缓存时间

  times.tcp = t.connectEnd - t.connectStart; // tcp连接耗时

  times.ttfb = t.responseStart - t.requestStart; // 请求响应耗时

  times.trans = t.responseEnd - t.responseStart; // 内容传输耗时

  times.dom = t.domInteractive - t.responseEnd; // dom解析耗时

  times.res = t.loadEventStart - t.domContentLoadedEventEnd; // 同步资源加载耗时

  times.ssllink = t.connectEnd - t.secureConnectionStart; // SSL安全连接耗时

  times.redirect = t.redirectEnd - t.redirectStart; // 重定向时间

  times.unloadTime = t.unloadEventEnd - t.unloadEventStart; // 上一个页面的卸载耗时

  emit(normalizePerformanceRecord({
    ...times,
    eventType: 'performance',
    eventId: 'page',
    url: window.location.href,
  }));
}

function init({ performanceFirstResource, performanceCore }) {
  if (!performanceFirstResource && !performanceCore) return;

  // 初始化方法可能在onload事件之后才执行,此时不会触发load事件了,检查document.readyState属性来判断onload事件是否会被触发
  if (document.readyState === 'complete') {
    if (supported.performance && performanceFirstResource) observeNavigationTiming();
  } else {
    window.addEventListener('load', () => {
      if (supported.performance && performanceFirstResource) observeNavigationTiming();
    })
  }
}

/**
 * 主动触发性能事件上报
 * @param {*} eventId 事件ID
 * @param {*} options 自定义配置信息
 */
function tracePerformance(eventId, options) {
  const record = {
    triggerTime: Date.now(),
    url: window.location.href,
    ...options,
    eventId,
    eventType: 'performance',
  };
  emit(normalizePerformanceRecord(record));
}

export default {
  init,
  tracePerformance,
};
