function _registerEvent (target, eventType, cb) {
  if (target.addEventListener) {
    target.addEventListener(eventType, cb)
    return {
      remove: function () {
        target.removeEventListener(eventType, cb)
      }
    }
  } else {
    target.attachEvent(eventType, cb)
    return {
      remove: function () {
        target.detachEvent(eventType, cb)
      }
    }
  }
}

function _createHiddenIframe (target, uri) {
  var iframe = document.createElement('iframe')
  iframe.src = uri
  iframe.id = 'hiddenIframe'
  iframe.style.display = 'none'
  target.appendChild(iframe)

  return iframe
}

function openUriWithHiddenFrame (uri, failCb, successCb) {
  var timeout = setTimeout(function () {
    failCb()
    handler.remove()
  }, 1000)

  var iframe = document.querySelector('#hiddenIframe')
  if (!iframe) {
    iframe = _createHiddenIframe(document.body, 'about:blank')
  }

  var handler = _registerEvent(window, 'blur', onBlur)

  function onBlur () {
    clearTimeout(timeout)
    handler.remove()
    successCb()
  }

  iframe.contentWindow.location.href = uri
}

function openUriWithTimeoutHack (uri, failCb, successCb) {
  var timeout = setTimeout(function () {
    failCb()
    handler.remove()
  }, 1000)

  // handle page running in an iframe (blur must be registered with top level window)
  var target = window
  // eslint-disable-next-line eqeqeq
  while (target != target.parent) {
    target = target.parent
  }

  var handler = _registerEvent(target, 'blur', onBlur)

  function onBlur () {
    clearTimeout(timeout)
    handler.remove()
    successCb()
  }

  window.location = uri
}

function openUriUsingFirefox (uri, failCb, successCb) {
  var iframe = document.querySelector('#hiddenIframe')

  if (!iframe) {
    iframe = _createHiddenIframe(document.body, 'about:blank')
  }

  try {
    iframe.contentWindow.location.href = uri
    successCb()
  } catch (e) {
    // eslint-disable-next-line eqeqeq
    if (e.name == 'NS_ERROR_UNKNOWN_PROTOCOL') {
      failCb()
    }
  }
}

function openUriUsingIEInOlderWindows (uri, failCb, successCb) {
  if (getInternetExplorerVersion() === 10) {
    openUriUsingIE10InWindows7(uri, failCb, successCb)
  } else if (getInternetExplorerVersion() === 9 || getInternetExplorerVersion() === 11) {
    openUriWithHiddenFrame(uri, failCb, successCb)
  } else {
    openUriInNewWindowHack(uri, failCb, successCb)
  }
}

function openUriUsingIE10InWindows7 (uri, failCb, successCb) {
  var timeout = setTimeout(failCb, 1000)
  window.addEventListener('blur', function () {
    clearTimeout(timeout)
    successCb()
  })

  var iframe = document.querySelector('#hiddenIframe')
  if (!iframe) {
    iframe = _createHiddenIframe(document.body, 'about:blank')
  }
  try {
    iframe.contentWindow.location.href = uri
  } catch (e) {
    failCb()
    clearTimeout(timeout)
  }
}

function openUriInNewWindowHack (uri, failCb, successCb) {
  var myWindow = window.open('', '', 'width=0,height=0')

  myWindow.document.write("<iframe src='" + uri + "'></iframe>")

  setTimeout(function () {
    try {
      // eslint-disable-next-line no-unused-expressions
      myWindow.location.href
      myWindow.setTimeout('window.close()', 1000)
      successCb()
    } catch (e) {
      myWindow.close()
      failCb()
    }
  }, 1000)
}

function openUriWithMsLaunchUri (uri, failCb, successCb) {
  navigator.msLaunchUri(uri,
    successCb,
    failCb
  )
}

function checkBrowser () {
  var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0
  var ua = navigator.userAgent.toLowerCase()
  return {
    isOpera: isOpera,
    isFirefox: typeof InstallTrigger !== 'undefined',
    isSafari: (~ua.indexOf('safari') && !~ua.indexOf('chrome')) || Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0,
    isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
    isChrome: !!window.chrome && !isOpera,
    isIE: /* @cc_on!@ */ false || !!document.documentMode // At least IE6
  }
}

function getInternetExplorerVersion () {
  var rv = -1
  if (navigator.appName === 'Microsoft Internet Explorer') {
    var ua = navigator.userAgent
    // eslint-disable-next-line no-useless-escape
    var re = new RegExp('MSIE ([0-9]{1,}[\.0-9]{0,})')
    if (re.exec(ua) != null) {
      rv = parseFloat(RegExp.$1)
    }
  } else if (navigator.appName === 'Netscape') {
    var ua = navigator.userAgent
    // eslint-disable-next-line no-useless-escape
    var re = new RegExp('Trident/.*rv:([0-9]{1,}[\.0-9]{0,})')
    if (re.exec(ua) != null) {
      rv = parseFloat(RegExp.$1)
    }
  }
  return rv
}

export default function (uri, failCb, successCb, unsupportedCb) {
  function failCallback () {
    failCb && failCb()
  }

  function successCallback () {
    successCb && successCb()
  }

  if (navigator.msLaunchUri) { // for IE and Edge in Win 8 and Win 10
    openUriWithMsLaunchUri(uri, failCb, successCb)
  } else {
    var browser = checkBrowser()

    if (browser.isFirefox) {
      openUriUsingFirefox(uri, failCallback, successCallback)
    } else if (browser.isChrome || browser.isIOS) {
      openUriWithTimeoutHack(uri, failCallback, successCallback)
    } else if (browser.isIE) {
      openUriUsingIEInOlderWindows(uri, failCallback, successCallback)
    } else if (browser.isSafari) {
      openUriWithHiddenFrame(uri, failCallback, successCallback)
    } else {
      unsupportedCb()
      // not supported, implement please
    }
  }
}
