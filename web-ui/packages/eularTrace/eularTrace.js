(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.webtracing = {}));
})(this, (function (exports) { 'use strict';

  /**
   * 补全字符
   * @param {*} num 初始值
   * @param {*} len 需要补全的位数
   * @param {*} placeholder 补全的值
   * @returns 补全后的值
   */
  function pad(num, len, placeholder = '0') {
    const str = String(num);
    if (str.length < len) {
      let result = str;
      for (let i = 0; i < len - str.length; i += 1) {
        result = placeholder + result;
      }
      return result;
    }
    return str;
  }

  /**
   * 获取一个随机字符串(全局唯一标识符)
   */
  function uuid() {
    const date = new Date();

    // yyyy-MM-dd的16进制表示,7位数字
    const hexDate = parseInt(`${date.getFullYear()}${pad(date.getMonth() + 1, 2)}${pad(date.getDate(), 2)}`, 10).toString(16);

    // hh-mm-ss-ms的16进制表示，最大也是7位
    const hexTime = parseInt(`${pad(date.getHours(), 2)}${pad(date.getMinutes(), 2)}${pad(date.getSeconds(), 2)}${pad(date.getMilliseconds(), 3)}`, 10).toString(16);

    // 第8位数字表示后面的time字符串的长度
    let guid = hexDate + hexTime.length + hexTime;

    // 补充随机数，补足32位的16进制数
    while (guid.length < 32) {
      guid += Math.floor(Math.random() * 16).toString(16);
    }

    // 分为三段，前两段包含时间戳信息
    return `${guid.slice(0, 8)}-${guid.slice(8, 16)}-${guid.slice(16)}`;
  }

  /**
   * 获取cookie中目标name的值
   * @param {String} name cookie名
   * @returns 
   */
  function getCookieByName(name) {
    const result = document.cookie.match(new RegExp(`${name}=([^;]+)(;|$)`));
    return result ? result[1] : undefined;
  }

  /**
   * 向下兼容发送信号的方法
   */
  const sendBeacon = navigator.sendBeacon
    ? (url, data) => {
      if (data) navigator.sendBeacon(url, JSON.stringify(data));
    }
    : (url, data) => {
      // 传统方式传递参数
      const beacon = new Image();
      beacon.src = `${url}?v=${encodeURIComponent(JSON.stringify(data))}`;
    };

  const arrayMap = Array.prototype.map || function polyfillMap(fn) {
    const result = [];
    for (let i = 0; i < this.length; i += 1) {
      result.push(fn(this[i], i, this));
    }
    return result;
  };

  /**
   * map方法
   * @param {Array} arr 源数组
   * @param {Function} fn 条件函数
   * @returns 
   */
  function map(arr, fn) {
    return arrayMap.call(arr, fn);
  }

  /**
   * 可以理解为异步执行
   * requestIdleCallback 是浏览器空闲时会自动执行内部函数
   * requestAnimationFrame 是浏览器必须执行的
   * 关于 requestIdleCallback 和  requestAnimationFrame 可以参考 https://www.cnblogs.com/cangqinglang/p/13877078.html
   */
  const nextTime = window.requestIdleCallback || window.requestAnimationFrame || ((callback) => setTimeout(callback, 17));

  const DEVICE_KEY = '_warden_device_id'; // deviceKey - 固定

  const SESSION_KEY = '_warden_session_id'; // sessionKey(一个站点只允许运行一个埋点程序) - 固定

  const SURVIVIE_MILLI_SECONDS = 1800000; // session存活时长(30minutes) - 固定

  const MAX_CACHE_LEN = 5; // 最大缓存数

  const MAX_WAITING_TIME = 5000; // 最大等待时间

  const { screen } = window;
  const { clientWidth, clientHeight } = document.documentElement;
  const { width, height, colorDepth, pixelDepth } = screen;

  let deviceId = getCookieByName(DEVICE_KEY);

  if (!deviceId) {
    deviceId = `t_${uuid()}`;
    document.cookie = `${DEVICE_KEY}=${deviceId};path=/;`;
  }

  var device = {
    clientHeight, // 网页可见区高度
    clientWidth, // 网页可见区宽度
    colorDepth, // 显示屏幕调色板的比特深度
    pixelDepth, // 显示屏幕的颜色分辨率
    deviceId, // id
    screenWidth: width, // 显示屏幕的宽度
    screenHeight: height, // 显示屏幕的高度
    vendor: navigator.vendor, // 浏览器名称
    platform: navigator.platform, // 浏览器平台的环境,不是电脑系统的x64这样的(浏览器平台的环境可能是x32)
  };

  /**
   * 会话控制,此会话只和具体的浏览器相关,与业务无关,和业务意义上的登录态没有任何关联,只是用于追踪同一个浏览器上访问页面的动作
   */

  /**
   * 刷新会话存续期
   */
  function refreshSession() {
    const id = getCookieByName(SESSION_KEY) || `s_${uuid()}`;
    const expires = new Date(Date.now() + SURVIVIE_MILLI_SECONDS);
    document.cookie = `${SESSION_KEY}=${id};path=/;max-age=1800;expires=${expires.toUTCString()}`;
    return id;
  }

  /**
   * 获取sessionid
   */
  function getSessionId() {
    return getCookieByName(SESSION_KEY) || refreshSession();
  }

  refreshSession(); // 初始化

  // import { version } from '../../package.json'

  // 当前应用ID,在整个页面生命周期内不变,单页应用路由变化也不会改变,加载SDK时创建,且只创建一次
  const pageId = uuid();

  // 与一般业务上理解的sessionId做区分,此session与业务无关,单纯就是浏览器端和后端直接的联系
  const sessionId = getSessionId();

  let requestUrl = ''; // 服务请求地址
  let events = []; // 批次队列
  let timer = null; // 定时发送定时器
  const base = { // 基础数据
    ...device,
    pageId,
    sessionId,
    // sdkVersion: version,
  };

  /**
   * 初始化基础数据
   * @param {*} options 基础配置
   */
  function init$5(options = {}) {
    const { appName, appCode, ext } = options;
    requestUrl = options.requestUrl;
    base.appName = appName;
    base.appCode = appCode;
    base.ext = ext;
  }

  /**
   * 记录需要发送的埋点数据
   * @param {*} e 需要发送的事件信息
   * @param {boolean} flush 是否立即发送
   */
  function emit(e, flush = false) {
    events = events.concat(e); // 追加到事件队列里
    refreshSession();
    clearTimeout(timer);

    // 满足最大记录数,立即发送,否则定时发送(flush为true代表立即发送)
    events.length >= MAX_CACHE_LEN || flush
      ? send()
      : timer = setTimeout(() => { send(); }, MAX_WAITING_TIME);
  }

  /**
   * 发送埋点信息
   */
  function send() {
    if (events.length) {
      // 选取首部的部分数据来发送,performance会一次性采集大量数据追加到events中
      const sendEvents = events.slice(0, MAX_CACHE_LEN); // 需要发送的事件
      events = events.slice(MAX_CACHE_LEN); // 剩下待发的事件

      const time = Date.now();
      sendBeacon(requestUrl, {
        baseInfo: { ...base, sendTime: time },
        eventInfo: map(sendEvents, (e) => {
          e.sendTime = time; // 设置发送时间

          // 补充type字段,将click、scroll、change、submit事件作为一类存储
          if (e.eventType === 'click' || e.eventType === 'scroll' || e.eventType === 'submit' || e.eventType === 'change') {
            e.type = 'mix';
            return e;
          }

          if (e.eventType === 'performance') {
            // 将性能进行分类,不同类型的性能数据差异较大,分开存放,资源、页面、请求
            switch (e.eventId) {
              case 'resource':
                e.type = 'resourcePerformance';
                break;
              case 'page':
                e.type = 'pagePerformance';
                break;
              case 'server':
                e.type = 'serverPerformance';
                break;
            }
            return e;
          }
          e.type = e.eventType; // 其他类型type同eventType
          return e;
        }),
      });
      if (events.length) nextTime(send); // 继续传输剩余内容,在下一个时间择机传输
    }
  }

  /**
   * 设置额外的 customerId
   * @param {*} id 需要设置的id
   */
  function setCustomerId(id) {
    base.customerId = id;
  }

  /**
   * 设置额外的 userUuid
   * @param {*} id 需要设置的id
   */
  function setUserUuid(id) {
    base.userUuid = id;
  }

  var base$1 = {
    init: init$5,
    emit,
    pageId,
    setCustomerId,
    setUserUuid,
  };

  let oldURL = window.location.href; // 最后一次的url
  let historyLength = window.history.length; // 最后一次history栈的长度

  /**
   * 发送数据
   * option 请求参数
   */
  function tracePageView(option = {}) {
    const { url = window.location.href, referer = oldURL, actions = '', params } = option;
    let action = actions;
    if (!action && window.history.length < 50) {
      action = historyLength === window.history.length ? 'back_forward' : 'navigation';
      historyLength = window.history.length;
    }
    // 如果option.title为空,则等待框架处理document.title,延迟17ms
    // 为什么是17ms?  一秒60Hz是基准,平均1Hz是17毫秒,只要出来了页面那就有 document.title
    setTimeout(() => {
      emit({
        eventType: 'pv',
        eventId: pageId,
        url,
        referer,
        params,
        title: option.title || document.title,
        action,
        triggerTime: Date.now(),
      });
    }, option.title ? 0 : 17);
    oldURL = url;
    historyLength = window.history.length;
  }

  /**
   * 路由Pv采集
   * pvHashtag 是否监听hash变化
   */
  function init$4(options = {}) {
    const { pvCore, pvHashtag } = options;
    if (!pvCore) return;

    let lastIsPop = false; // 最后一次触发路由变化是否为popState触发
    // tracePageView({ url: oldURL, referer });// reason：这个可以给它注释掉

    if (window.history.pushState) {
      // 劫持history.pushState history.replaceState
      const push = window.history.pushState.bind(window.history);
      window.history.pushState = (data, title, url) => {
        lastIsPop = false;
        const result = push(data, title, url);
        tracePageView({ actions: 'navigation' });
        return result;
      };

      const repalce = window.history.replaceState.bind(window.history);
      window.history.replaceState = (data, title, url) => {
        lastIsPop = false;
        const result = repalce(data, title, url);
        tracePageView({ actions: 'navigation' });
        return result;
      };

      // hash变化也会触发popstate事件,而且会先触发popstate事件
      // 可以使用popstate来代替hashchange,如果支持History H5 Api
      // https://developer.mozilla.org/zh-CN/docs/Web/API/Window/popstate_event
      window.addEventListener('popstate', () => {
        if (window.location.hash !== '') {
          const oldHost = oldURL.indexOf('#') > 0 // 多页面情况下 history模式刷新还是在pv页面
            ? oldURL.slice(0, oldURL.indexOf('#'))
            : oldURL;
          if (window.location.href.slice(0, window.location.href.indexOf('#')) === oldHost && !pvHashtag) return;
        }
        lastIsPop = true;
        tracePageView();
      });
    }
    // 监听hashchange
    window.addEventListener('hashchange', () => {
      if (pvHashtag && !lastIsPop) tracePageView();
      lastIsPop = false;
    });
  }

  var pv = {
    init: init$4,
    tracePageView
  };

  function setFullErrInfo(errorInfo) {
    const info = {
      ...errorInfo,
      eventType: 'error',
      url: window.location.href,
      triggerTime: Date.now(),
    };
    emit(info);
  }

  function init$3({ errorCore }) {
    if (!errorCore) return;
  }

  /**
   * 主动触发错误上报
   * @param {*} eventId 事件ID
   * @param {*} message 错误信息
   * @param {*} options 自定义配置信息
   * @returns 
   */
  function traceError(eventId, message, options = {}) {
    const customErrorRecord = { eventId, errMessage: message, ...options };

    // 针对自定义的异常上报,对params对特殊处理,将其序列化为string
    const { params } = customErrorRecord;
    if (params) {
      customErrorRecord.params = params;
    }
    return setFullErrInfo(customErrorRecord);
  }

  var err = {
    init: init$3,
    traceError,
  };

  class RequestTemplate {
    constructor(config = {}) {
      const list = ['eventType', 'eventId', 'url', 'referer', 'action', 'params', 'millisecond'];
      list.forEach((key) => { this[key] = config[key] || null; });
    }
  }
  class RequestTemplateClick {
    constructor(config = {}) {
      const list = ['eventType', 'eventId', 'url', 'params', 'title', 'x', 'y'];
      list.forEach((key) => { this[key] = config[key] || null; });
    }
  }

  /**
   * 是否为简单的标签
   * 只包含下面的arr数组内的标签才是简单的标签
   */
  function isSimpleEl(children) {
    if (children.length > 0) {
      const arr = ['em', 'b', 'strong', 'span', 'img', 'i', 'code'];
      const a = children.filter(({ tagName }) => arr.indexOf(tagName.toLowerCase()) >= 0);
      return a.length === children.length;
    }
    return true;
  }

  /**
   * 获取元素到最外层元素组成的数组
   */
  function getNodePath(node, options = {}) {
    if (!node) return [];
    const { includeSelf = true, order = 'asc' } = options;
    let parent = includeSelf ? node : node.parentElement;
    let result = [];
    while (parent) {
      result = order === 'asc' ? result.concat(parent) : [parent].concat(result);
      parent = parent.parentElement;
    }
    return result;
  }

  /**
   * 获取元素的关系字符串
   * 例如两层div的关系会得到字符串: div>div
   */
  function getNodeXPath(node, curPath = '') {
    if (!node) return curPath;
    const parent = node.parentElement;
    let index = 0; // 这个index 暂时没什么用
    const { id } = node;
    const tagName = node.tagName.toLowerCase();
    const path = curPath ? `>${curPath}` : '';
    const indexBrackets = index ? `.${index}` : '';

    if (!parent || parent === window || parent === document.documentElement || parent === document.body) return `${tagName}${path}`;

    if (id) return `#${id}${path}`; // 知道了id 就不需要获取上下级关系了(id是唯一的)

    if (parent.children.length > 1) index = Array.prototype.indexOf.call(parent.children, node);

    return getNodeXPath(parent, `${tagName}${indexBrackets}${path}`);
  }

  /**
   * 点击事件
   */
  function clickCollection() {
    document.addEventListener('click', (e) => { // 点击事件
      const _config = new RequestTemplateClick({ eventType: 'click' });
      let { path } = e;
      if (path === undefined) path = e.target ? getNodePath(e.target) : []; // 获取被点击的元素到最外层元素组成的数组

      const target = path.find((el) => // 检查被点击的元素以及其父级元素是否有这些属性(从内到外,只会取第一个检查到的)
        el.hasAttribute && (el.hasAttribute('data-warden-container')
          || el.hasAttribute('data-warden-event-id')
          || el.hasAttribute('data-warden-title')));
      if (!target) return; // ：在这里return 掉了很多东西

      _config.title = extractTitleByTarget(target);
      _config.eventId = extractDataByPath(path);
      _config.params = extractParamsByPath(path);
      _config.elementPath = getNodeXPath(target).slice(-128); // 长度限制128字符
      const { top, left } = e.target.getBoundingClientRect(); // 元素距离html的距离
      const { scrollTop, scrollLeft } = document.documentElement; // html距离上和左侧的距离(一般都是0)
      const x = left + scrollLeft;
      const y = top + scrollTop;
      _config.x = x;
      _config.y = y;
      _config.triggerTime = Date.now(); // 点击时间
      _config.url = window.location.href; // 当前页面的url
      emit(_config);
    }, true);
  }

  /**
   * 加载 & 卸载事件
   */
  function dwellCollector(eventUnload) {
    const _config = new RequestTemplate({ eventType: 'dwell' });
    window.addEventListener('load', () => { // 加载完成事件
      _config.entryTime = Date.now();
    }, true);

    if (!eventUnload) return;
    window.addEventListener('beforeunload', () => { // 卸载事件
      _config.eventId = uuid();
      _config.url = window.location.href; // 当前页面 url
      _config.referer = document.referrer; // 上级页面 url(从哪个页面跳过来的就是上级页面)
      _config.triggerTime = Date.now(); // 卸载时间
      _config.millisecond = Date.now() - _config.entryTime; // 停留多久
      const mapping = {
        0: 'navigate', // 网页通过点击链接,地址栏输入,表单提交,脚本操作等方式加载
        1: 'reload', // 网页通过“重新加载”按钮或者location.reload()方法加载
        2: 'back_forward', // 网页通过“前进”或“后退”按钮加载
        255: 'reserved', // 任何其他来源的加载
      };
      const { type } = performance.navigation; // 表示加载来源, type为 0,1,2,255
      _config.operateAction = mapping[type] || null;
      emit(_config, true);
    }, false);
  }

  /**
   * 提取数据事件ID
   */
  function extractDataByPath(list = []) {
    /* data-warden-event-id */
    const hasIdEl = getElByAttr(list, 'data-warden-event-id');
    if (hasIdEl) return hasIdEl.getAttribute('data-warden-event-id');

    /* title */
    const hasTitleEl = getElByAttr(list, 'title');
    if (hasTitleEl) return hasTitleEl.getAttribute('title');

    /* container */
    const container = getElByAttr(list, 'data-warden-container');
    if (container) {
      if (container.getAttribute('data-warden-event-id') || container.getAttribute('title')) {
        return container.getAttribute('data-warden-event-id') || container.getAttribute('title');
      }
      const id2 = container.getAttribute('data-warden-container');
      if (typeof id2 === 'string' && id2) return id2;
    }
    return list[0].tagName.toLowerCase();
  }

  /**
   * 提取数据参数
   * 如果本身节点没有埋点属性的话会用上一层埋点属性
   */
  function extractParamsByPath(list = []) {
    const regex = /^data-warden-/;
    let target;
    let targetIndex;
    try {
      // 遍历从子节点到body下最大的节点,遍历他们的属性,直到某个节点的属性能通过校验的节点
      list.forEach((el, index) => {
        const attributes = el && el.attributes && Array.from(el.attributes) || [];
        target = attributes.find((item) => (item.nodeName.match(regex)
          ? item.nodeName.match(regex)
          : item.nodeName.indexOf('data-warden-container') !== -1));
        if (target) {
          targetIndex = index;
          throw Error();
        }
      });
    } catch (error) {
    }
    if (targetIndex < 0) return {};

    const container = list[targetIndex];
    const attrList = Array.from(container.attributes) || [];
    const params = {};
    attrList.forEach((item) => {
      // 过滤多结构属性 如 data-warden-event-id width
      // if(item.nodeName.split("-").length != 3 )return;
      // 过滤非标准命名 如 data-v-fbcf7454
      if (item.nodeName.indexOf('data-warden') < 0) return;
      const key = item.nodeName.replace(regex, '');
      params[key] = item.nodeValue;
    });

    // 过滤sdk自定义属性
    const defaultKey = ['container', 'title', 'event-id'];
    defaultKey.forEach((item) => { delete params[item]; });
    return params;
  }

  /**
   * 根据属性查找元素
   */
  function getElByAttr(list, key) {
    return list.find((item) => (item.hasAttribute && item.hasAttribute(key)));
  }

  /**
   * 获取title属性(data-warden-title 或者 title)
   */
  function extractTitleByTarget(target = {}) {
    const selfTitle = getNodeTitle(target);
    if (selfTitle) return selfTitle;

    let container = target.parent; // 向上找container

    while (container && container !== document.body) {
      if (container.hasAttribute('data-warden-container')) break;
      container = container.parent;
    }
    const superTitle = getNodeTitle(container);
    if (superTitle) return superTitle;

    const { tagName } = target; // 没有container,没有任何title标记的情况下
    return (!target.hasChildNodes() || tagName.toLowerCase() === 'svg')
      ? handleLeafNode(target)
      : handleNoLeafNode(target);
  }

  /**
   * 获取元素的 data-warden-title属性或者 title属性
   */
  function getNodeTitle(node) {
    if (node) {
      return node.hasAttribute('data-warden-title') ? node.getAttribute('data-warden-title') : node.title;
    }
    return null;
  }

  /**
   * 点击叶子元素(也就是不包含其他HTML元素,也不能有文本内容)
   */
  function handleLeafNode(target) {
    const { tagName, textContent } = target;

    if (tagName === 'IMG') return target.getAttribute('alt') || null;

    if (tagName === 'svg') {
      const a = [...target.children].find((item) => (item.tagName === 'use'));
      if (a) return a.getAttribute('xlink:href') || null;
    }
    return textContent;
  }

  /**
   * 点击非叶子元素
   */
  function handleNoLeafNode(target) {
    const { tagName, textContent } = target;
    if (tagName === 'A') {
      const res = isSimpleEl([...target.children]);
      return res ? textContent : target.getAttribute('href') || null;
    }
    if (tagName === 'BUTTON') {
      const name = target.getAttribute('name');
      const res = isSimpleEl([...target.children]);
      return name || res ? textContent : target.getAttribute('href') || null;
    }
    const { length } = [...target.children].filter(() => target.hasChildNodes());
    return length > 0 ? null : textContent;
  }

  function init$2({ eventCore, eventUnload }) {
    if (!eventCore && !eventUnload) return;

    if (eventCore) clickCollection();
    dwellCollector(eventUnload);
  }

  /**
   * 主动触发事件上报
   * @param {*} eventId 事件ID
   * @param {*} title 事件标题
   * @param {*} params 自定义配置信息
   * @returns 
   */
  function traceCustomEvent(eventId, title, params = {}) {
    emit({ eventId, title, params, eventType: 'custom', triggerTime: Date.now() });
  }

  var event = {
    init: init$2,
    traceCustomEvent,
  };

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

  function init$1({ performanceFirstResource, performanceCore }) {
    if (!performanceFirstResource && !performanceCore) return;

    // 初始化方法可能在onload事件之后才执行,此时不会触发load事件了,检查document.readyState属性来判断onload事件是否会被触发
    if (document.readyState === 'complete') {
      if (supported.performance && performanceFirstResource) observeNavigationTiming();
    } else {
      window.addEventListener('load', () => {
        if (supported.performance && performanceFirstResource) observeNavigationTiming();
      });
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

  var performance$1 = {
    init: init$1,
    tracePerformance,
  };

  const methods = {
    setCustomerId: base$1.setCustomerId,
    setUserUuid: base$1.setUserUuid,
    traceError: err.traceError,
    tracePerformance: performance$1.tracePerformance,
    traceCustomEvent: event.traceCustomEvent,
    tracePageView: pv.tracePageView,
  };

  const init = (options = {}) => {
    const _options = {
      requestUrl: '', // 请求地址
      appName: '', // 应用名称
      appCode: '', // 应用code
      appVersion: '', // 应用版本
      ext: '', // 自定义全局附加参数
      debug: false, // 是否开启触发事件时控制台输出

      pvCore: false, // 页面跳转-是否自动发送页面跳转相关数据
      pvHashtag: false, // 页面跳转-浏览器的动作发生时(例如浏览器的回退按钮)是否监听hash变化,如果是hash路由请开启此开关

      performanceCore: false, // 性能数据-是否采集静态资源、接口的相关数据
      performanceFirstResource: false, // 性能数据-是否采集首次进入页面的数据(ps: tcp连接耗时,HTML加载完成时间,首次可交互时间)
      performanceServer: false, // 接口请求-是否采集接口请求(成功的才会采集)

      errorCore: false, // 是否采集异常数据(ps: 资源引入错误,promise错误,控制台输出错误)
      errorServer: false, // 接口请求-是否采集报错接口数据

      eventCore: false, // 页面点击-是否采集点击事件
      eventUnload: false, // 页面卸载-是否在页面卸载时采集页面状态信息
    };

    // 将传过来的参数转换
    transitionOptions(_options, options);

    base$1.init(_options);
    event.init(_options);
    pv.init(_options);
    performance$1.init(_options);
  };

  const transitionOptions = (_options, options) => {
    const {
      requestUrl,
      appName,
      appCode,
      appVersion,
      ext,
      debug,
      pv = {},
      performance = {},
      error = {},
      event = {},
    } = options;

    if (!requestUrl) throw Error('请传入requestUrl参数');
    if (!appName) throw Error('请传入appName参数');

    _options.requestUrl = requestUrl;
    _options.appName = appName;
    _options.appCode = appCode;
    _options.appVersion = appVersion;
    _options.ext = ext;
    _options.debug = debug;

    if (typeof pv === 'boolean') {
      _options.pvCore = _options.pvHashtag = pv;
    } else {
      _options.pvCore = Boolean(pv.core);
      _options.pvHashtag = Boolean(pv.server);
    }

    if (typeof performance === 'boolean') {
      _options.performanceCore = _options.performanceFirstResource = _options.performanceServer = performance;
    } else {
      _options.performanceCore = Boolean(performance.core);
      _options.performanceFirstResource = Boolean(performance.firstResource);
      _options.performanceServer = Boolean(performance.server);
    }

    if (typeof error === 'boolean') {
      _options.errorCore = _options.errorServer = error;
    } else {
      _options.errorCore = Boolean(error.core);
      _options.errorServer = Boolean(error.server);
    }

    if (typeof event === 'boolean') {
      _options.eventCore = _options.eventUnload = event;
    } else {
      _options.eventCore = Boolean(event.core);
      _options.eventUnload = Boolean(event.unload);
    }
  };

  const install = (Vue, options = {}) => {
    init(options);
    if (Vue.prototype) {
      Vue.prototype.$trace = { ...methods };
    } else {
      Vue.config.globalProperties.$trace = { ...methods };
    }
  };

  var index = {
    install,
    init,
    ...methods
  };

  exports["default"] = index;
  exports.init = init;
  exports.install = install;
  exports.methods = methods;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=test3.umd.js.map
