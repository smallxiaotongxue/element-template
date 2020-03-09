/**
 *
 * @param obj
 * @returns {string|"undefined"|"boolean"|"number"|"string"|"function"|"symbol"|"bigint"}
 */
const getType = (obj) => {
  let type = typeof obj;
  if (type !== 'object') {
    return type;
  }
  return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1').toLowerCase();
};

/**
 * 获取浏览器类型
 * @returns {string}
 */
const getBrowser = () => {
  let userAgent = navigator.userAgent;
  if (userAgent.indexOf('Opera') > -1) return 'Opera';
  if (userAgent.indexOf('Firefox') > -1) return 'Firefox';
  if (userAgent.indexOf('Chrome') > -1) return 'Chrome';
  if (userAgent.indexOf('Safari') > -1) return 'Safari';
  if (userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !(userAgent.indexOf('Opera') > -1)) {
    return 'IE';
  }
};

/**
 * 获取元素距离顶部高度
 * @param el
 * @returns {*}
 * @private
 */
const _getOffsetTop = (el) => {
  let rtn = el.offsetTop;
  let o = el.offsetParent;

  while (o != null) {
    rtn += o.offsetTop;
    o = o.offsetParent;
  }

  return rtn;
};

/**
 * 处理animate.css元素动画
 * data-animate="fadeIn,2000,linear"
 */
const handleAnimate = () => {
  let top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  let vh = document.documentElement.clientHeight;
  let dom = document.querySelectorAll('.animated');

  [].slice.call(dom).forEach(el => {
    if (!el.dataset.animate) {
      return false;
    }

    if (top + vh > _getOffsetTop(el)) {
      el.style.opacity = 1;
      // 添加动画样式
      el.classList.add(el.dataset.animate.split(',')[0]);

      el.style.animationDuration = el.dataset.animate.split(',')[1];
      el.style.animationTimingFunction = el.dataset.animate.split(',')[2];

      if (el.dataset.delay) {
        el.style.animationDelay = el.dataset.delay;
      }
    } else {
      el.classList.remove(el.dataset.animate.split(',')[0]);
      el.style.opacity = 0;
    }
  });
};

/**
 *  时间处理方法
 */
const _formatNumber = (n) => {
  const str = n.toString();
  return str[1] ? str : `0${str}`;
};

const _timeFormat = (ms) => {
  if (!ms) return '';

  let date = new Date(parseInt(ms));

  let Y = date.getFullYear();
  let M = date.getMonth() + 1;
  let D = date.getDate();
  let h = _formatNumber(date.getHours());
  let m = _formatNumber(date.getMinutes());
  let s = _formatNumber(date.getSeconds());

  return `${Y}-${M}-${D} ${h}:${m}:${s}`;
};

/**
 *
 * @param func
 * @param time
 * @param options
 *            leading---是否在进入时执行一次
 *            trailing---是否在结束时额外再出发一次
 * @returns {_debounce}
 */
const debounce = (func, time = 50, options = { leading: true, trailing: true, context: null }) => {
  let timer;
  const _debounce = function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    if (options.leading && !timer) {
      timer = setTimeout(null, time);
      func.apply(options.context, args);
      timer = null;
    } else if (options.trailing) {
      timer = setTimeout(() => {
        func.apply(options.context, args);
        timer = null;
      }, time);
    }
  };

  _debounce.cancel = function () {
    clearTimeout(timer);
    timer = null;
  };

  return _debounce;
};

/**
 * 函数节流
 * @param func
 * @param time
 * @param options
 * @returns {_throttle}
 */
const throttle = (func, time = 30, options = { leading: true, trailing: true, context: null }) => {
  let previous = new Date(0).getTime();
  let timer;

  const _throttle = function (...args) {
    let now = new Date().getTime();

    if (!options.leading) {
      if (timer) return;

      timer = setTimeout(() => {
        timer = null;
        func.apply(options.context, args);
      }, time);
    } else if (now - previous > time) {
      func.apply(options.context, args);
      previous = now;
    } else if (options.trailing) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(options.context, args);
      }, time)
    }
  };

  _throttle.cancel = () => {
    previous = 0;
    clearTimeout(timer);
    timer = null;
  };

  return _throttle;
};

const downloadFile = (url, name) => {
  var a = document.createElement('a');
  document.body.appendChild(a);

  a.href = url;
  a.download = name || '下载文件';
  a.click()
  document.body.removeChild(a);
};

export default {
  getType,
  getBrowser,
  _getOffsetTop,
  handleAnimate,
  _formatNumber,
  _timeFormat,
  debounce,
  throttle,
  downloadFile,
}
