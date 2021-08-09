export function debounce(func, delay = 500) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay);
  }
}


//时间戳的转化
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? str : padLeftzero(str));
    }
  }
  return fmt;
}

function padLeftzero(str) {
  return ('00' + str).substr(str.length);
}

export function getTime(second, getDateType) {
  var date = new Date(second);
  if (getDateType == 0) {
    return date.getFullYear()+'年';
  } else if (getDateType == 1) {
    if ((date.getMonth() + 1) <= 9) {
      return "0" + (date.getMonth() + 1)+'月';
    } else {
      return (date.getMonth() + 1)+'月';
    }
  } else if (getDateType == 2) {
    if (date.getDate() <= 9) {
      return "0" + date.getDate()+'日';
    } else {
      return date.getDate()+'日';
    }
  } else if (getDateType == 3) {
    if (date.getHours() <= 9) {
      return "0" + date.getHours();
    } else {
      return date.getHours();
    }
  } else if (getDateType == 4) {
    if (date.getMinutes() <= 9) {
      return "0" + date.getMinutes();
    } else {
      return date.getMinutes();
    }
  } else if (getDateType == 5) {
    return date.getSeconds();
  } else {
    alert("输入时间格式有误!");
    return;
  }
}
