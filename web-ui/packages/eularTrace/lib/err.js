import { emit } from './base';

function setFullErrInfo(errorInfo) {
  const info = {
    ...errorInfo,
    eventType: 'error',
    url: window.location.href,
    triggerTime: Date.now(),
  };
  emit(info);
}

function init({ errorCore }) {
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

export default {
  init,
  traceError,
};
