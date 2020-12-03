const Lo = {
  isInt(s) {
    return parseInt(s) === s
  },
  isInts(s) {
    return /^[\d]+\.?[\d]+$/.test(s)
  },
  isBool(s) {
    return Object.prototype.toString.call(s) === '[object Boolean]'
    // return typeof (s) == 'boolean' ? true : false
  },
  isNum(s) {
    return Object.prototype.toString.call(s) === '[object Number]'
    // return typeof (s) == 'number' ? true : false
  },
  // 判断是否 浮点类型
  isFloat(s) {
    return (parseFloat(s) === s && s.toString().indexOf('.') !== -1) || false
  },
  isStr(s) {
    return Object.prototype.toString.call(s) === '[object String]'
    // return typeof (s) == 'string' ? true : false
  },
  isArr(d) {
    return Object.prototype.toString.call(d) === '[object Array]'
    // return d instanceof Array
  },
  isObj(d) {
    return Object.prototype.toString.call(d) === '[object Object]'
    // if (typeof (d) === 'object' && d !== null) return true
    // else return false
  },
  isFun(d) {
    return Object.prototype.toString.call(d) === '[object Function]'
    // return d instanceof Function
  },
  isDate(d) {
    return Object.prototype.toString.call(d) === '[object Date]'
    // return d instanceof Date
  }
}

// 对象克隆
Lo.clone = function(obj) {
  return JSON.parse(JSON.stringify(obj))
}

// 变量是否为空，可以判断 字符串，对象，数组，bool，数字
Lo.isEmpty = function (o) {
  if (o && Lo.isFun(o.test) && Lo.isFun(o.compile)) {
    return false
  } else if (Lo.isObj(o)) {
    return Lo.count(o) === 0 || false
  } else if (Lo.isStr(o) || Lo.isArr(o)) {
    return o.length === 0 || false
  } else if (Lo.isNum(o)) {
    return false
  } else if (Lo.isBool(o)) {
    return false
  } else if (o === null) {
    return true
  } else {
    return !Lo.isDefined(o)
  }
}

// 判断对象中属性是否定义过
Lo.isDefined = function (d) {
  // return !(Object.prototype.toString.call(d)==='[object Undefined]')
  return !(typeof d === 'undefined')
}

// 对象和数组的数量统计
Lo.count = function (obj) {
  var n = 0
  Lo.each(obj, function () {
    n++
  })
  return n
}

// 数组 对象 循环
Lo.each = function (o, cb) {
  if (!cb) return false
  if (Lo.isArr(o)) {
    o.forEach(cb)
  } else if (Lo.isObj(o)) {
    for (var i in o) {
      cb(o[i], i, o)
    }
  }
}
Lo.find = function (source, value, key = 'label') {
  const cb = source.find(v => value === v.value)
  return cb ? cb[key] : null
}
Lo.arrFind = function (source, key, bool = true) {
  if (bool) {
    return source.findIndex(v => v === key) !== -1
  } else {
    return source.findIndex(v => v == key) !== -1
  }
}

Lo.time = function (type, t, no0, lang) {
  lang = lang || 'zh'
  if (!type) type = 's'
  if (Lo.isStr(t)) {
    t = t.replace('年', '-').replace('月', '-').replace('日', ' ').replace('时', ':').replace('分', ':').replace('秒', ' ')
    if (t.substr(-1, 1) === ':') {
      t += '00'
    }
  }
  var weeks = {
    zh: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  }
  var APs = [{zh: '上午', en: 'AM'}, {zh: '下午', en: 'PM'}]
  var Months = [{zh:"1月",en:"Jan"},{zh:"2月",en:"Feb"},{zh:"3月",en:"Mar"},{zh:"4月",en:"Apr"},{zh:"5月",en:"May"},{zh:"6月",en:"Jun"},{zh:"7月",en:"Jul"},{zh:"8月",en:"Aug"},{zh:"9月",en:"Sep"},{zh:"10月",en:"Oct"},{zh:"11月",en:"Nov"},{zh:"12月",en:"Dec"}];
  var now
  if (!t) now = new Date()
  else if (t > 0 && t < 9000000000) {
    now = new Date(t * 1000)
  } else if (t > 9000000000) {
    now = new Date(t)
  } else if (typeof (type) === 'string') {
    now = new Date(t)
    if (isNaN(now.getTime())) {
      if (t.indexOf(' ')) {
        t = t.replace(' ', 'T')
        now = new Date(t)
        now = new Date(now.getTime() - 3600 * 8000)
      } else if (t.indexOf('T')) {
        t = t.replace('T', ' ')
        now = new Date(t)
        now = new Date(now.getTime() + 3600 * 8000)
      }
    }
  } else if (Lo.isDate(t)) { now = t }
  if (type === 's') return Math.floor(now.getTime() / 1000)
  else if (type === 'ms') return now.getTime()
  else if (type.length > 0) {
    var day = {}
    day.Y = now.getFullYear()
    day.m = now.getMonth() + 1
    if (lang === 'en') day.m = Months[day.m][lang]
    day.d = now.getDate()
    day.H = now.getHours()
    day.h = day.H
    day.A = APs[0][lang]
    if (day.h > 12) {
      day.A = APs[1][lang]
      day.h = day.h - 12
    }
    day.i = now.getMinutes()
    day.s = now.getSeconds()
    day.M = now.getMilliseconds()
    day.w = now.getDay()
    day.W = weeks[lang][day.w]
    day.z = '+' + Lo.time.n2s(Math.abs(now.getTimezoneOffset()))
    day.Z = now.getTimezoneOffset() / 60
    var krr = []
    for (var key in day) {
      krr.push(key)
    }
    type = type.replace(new RegExp('(' + krr.join('|') + ')', 'g'), function (e, key) {
      if (day[key] < 10 && key !== 'Z' && key !== 'w' && (!no0 || key === 'i' || key === 's')) day[key] = '0' + day[key]
      return day[key] || ''
    })
    return type
  }
}

// 480 -> 08:00 时区差 分钟转小时
Lo.time.n2s = function (n) {
  var r = ''
  var h = Math.floor(n / 60)
  var s = n % 60
  if (h < 60) { r += (h < 10 ? ('0' + h) : h) + ':' + (s < 10 ? ('0' + s) : s) }
  return r
}

// 排序
Lo.sort = function (arr) {
  return arr.sort(Lo.sortNumber)
}
Lo.sortNumber = function (a, b) {
  return a - b
}

// 对象转为form格式
Lo.toFormData = function(obj) {
  const formData = new FormData();
  Object.keys(obj).forEach(key => {
    formData.append(key, obj[key]);
  })
  return formData
}
// 对象转数组
Lo.toArray = function(obj, key, bool) {
  const arr = Object.keys(obj).map(key => {
    if (bool) return { name: key, value: obj[key] }
    else return obj[key]
  })
  if (key) {
    const classArr = [...new Set(arr.map(v => v.value[key]))]
    const cbArr = []
    classArr.forEach(level => {
      cbArr.push({ key: level, value: arr.filter(item => item.value[key] === level) })
    })
    return cbArr
  } else {
    return arr
  }
}
Lo.toObject = function(array) {
  return Object.fromEntries(array.map(item => [item.name, item.value]))
}
Lo.JsonParseStr = function(obj, cb = '') {
  try { return JSON.parse(obj) } catch (e) { return cb }
}
Lo.objMerge = function(obj, source) {
  return Object.assign(Lo.clone(obj), source)
}
// 对象不同判断
Lo.aDifferenceb = function(a, b) {
  const arrA = new Set(a)
  const arrB = new Set(b)
  return [...new Set([...arrA].filter(x => !arrB.has(x)))]
}

// 删除字符串内容
Lo.delStr = function(source, del1, del2) {
  del1 = del1.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1')
  const str = source.replace(new RegExp(del1,'g'), '')
  if (del2) {
    return str.replace(new RegExp(del2,'g'), '')
  }
  return str
}

// ua
Lo.uaParse = function (ua) {
  const o = {
    version: (ua.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0, '0'])[1],
    webkit: /webkit/i.test(ua),
    safari: /safari/i.test(ua),
    opera: /opera/i.test(ua),
    msie: /msie/i.test(ua) && !/opera/.test(ua),
    mozilla: /mozilla/i.test(ua) && !/(compatible|webkit)/.test(ua),
    isWp: /windows phone/i.test(ua),
    isIphone: /iphone/i.test(ua),
    isIpad: /ipad/i.test(ua),
    isAndroid: /android/i.test(ua),
    isWechat: /micromessenger/i.test(ua),
    isQQ: /\sqq\/\d/i.test(ua),
    btopCordova: /btopcordova/i.test(ua),
    container: /aiyiwebcontainer/i.test(ua),
    theworld: /theworld/i.test(ua),
    vivaldi: /vivaldi/i.test(ua)
  }
  o.isWin = /windows/i.test(ua) && !o.isWp
  o.macos = /mac os x/i.test(ua) && !o.isIphone && !o.isIpad
  o.isIos = (o.isIpad || o.isIphone) || false // 是否ios
  o.isSafari = false
  if (o.isIos && !o.isWechat && !o.btopCordova) {
    o.isSafari = /safari/i.test(ua) // 是否ios下的原生浏览器
  }
  o.isMobile = (o.isIos || o.isAndroid) || false // 是否移动设备
  o.isPc = (o.isWin || o.macos) || false // 是否PC设备
  o.ua = ua // ua
  return o
}
const userAgent = navigator.userAgent.toLowerCase()
Lo.userAgent = userAgent
Lo.browser = Lo.uaParse(userAgent)

// url
Lo.url = function (key, val) {
  if (!Lo.url.obj) Lo.url.parse()
  const o = Lo.url.obj
  if (arguments.length === 1) {
    if (Lo.isObj(key)) {
      for (const i in key) {
        Lo.url(i, key[i])
      }
      return
    }
    return o[key]
  } else if (arguments.length === 0) {
    return o
  } else if (arguments.length === 2) {
    if (val === null) delete o[key]
    else o[key] = val
    const search = Lo.url.unite(o)
    try{
      history.replaceState({}, document.title, '?' + search)
    }catch(e){}
    return location.href.split('?')[0] + '?' + search
  }
}
// url解析
Lo.url.parse = function (url) {
  const o = {}
  let s = ''
  if (url) {
    try {
      s = url.split('?')[1] || ''
    } catch (e) { return {} }
  } else if (location && location.search) {
    s = location.search.substr(1)
  }
  s.split('&').forEach(function (v) {
    if (!v || !Lo.isDefined(v) || v.length < 1) return
    const vr = v.split('=')
    o[vr[0]] = decodeURIComponent(vr[1])
  })
  if (!url) Lo.url.obj = o
  return o
}
// url合并
Lo.url.unite = (o, p, ec) => {
  const url = []
  if (Lo.isArr(o)) {
    o.map((v, i) => {
      let key = `[${i}]`
      if (p) key = p + key
      if (Lo.isObj(v) || Lo.isArr(v)) return url.push(Lo.url.unite(v, key, ec))
      url.push(key + '=' + (ec ? encodeURIComponent: encodeURI)(v))
    })
  } else if (Lo.isObj(o)) {
    for (const i in o) {
      let key = i
      if (p) key = p + '[' + i + ']'
      if (Lo.isObj(o[i]) || Lo.isArr(o[i])) {
        url.push(Lo.url.unite(o[i], key, ec))
      } else {
        url.push(key + '=' + (ec ? encodeURIComponent: encodeURI)(o[i]))
      }
    }
  }
  return url.join('&')
}

// file
Lo.base64ToFile = function(file) {
  const arr = file.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  const newBlob = new Blob([u8arr], { type: mime })
  newBlob.lastModifiedDate = newBlob.name = Lo.time('s')
  return newBlob
}

// is 16 years
Lo.is16 = function(idNo) {
  let birth = ''
  if (idNo.length === 15) {
    birth = idNo.substring(6,12)
    birth = `19${date}`
    birth = `${birth.substring(0, 4)}-${birth.substring(4, 6)}-${birth.substring(6)}`
  } else {
    birth = idNo.substring(6,14)
    birth = `${birth.substring(0, 4)}-${birth.substring(4,6)}-${birth.substring(6)}`
  }

  const date = new Date(birth)
  const now = new Date()
  now.setFullYear(now.getFullYear() - 16)
  return Lo.time('s', Lo.time('Y-m-d', now)) > Lo.time('s', date)
}

//判断11位手机号码
Lo.checkCellphone = (phone) => /^1[3-9]\d{9}$/.test(phone)

export default Lo
