/*
 * @Author: backtonature 
 * @Date: 2018-05-22 20:08:19 
 * @Last Modified by: backtonature
 * @Last Modified time: 2018-05-29 11:24:07
 */
const userAgent = window.navigator.userAgent;
export default {
  loadScript(url, callback) {
    const doc = document;
    const head = doc.head || doc.getElementsByTagName('head')[0] || doc.documentElement;
    const script = doc.createElement('script');
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    if (script.readyState) {
        script.onreadystatechange = function () {
        if (/loaded|complete/i.test(script.readyState)) {
          script.onreadystatechange = null;
          callback && callback.call(this);
        }
        };
    } else {
        script.onload = function () {
          callback && callback.call(this);
        };
    }
    script.src = url;
    head.insertBefore(script, head.firstChild);
  },
  execStyle(cssText) {
    const document = window.document;
    const styleTag = document.createElement('style');
    styleTag.setAttribute('type', 'text/css');
    if (document.all) {
      styleTag.styleSheet.cssText = cssText;
    } else {
      styleTag.innerHTML = cssText;
    }
    document.getElementsByTagName("head").item(0).appendChild(styleTag);
  },
  ua: {
    isFromAndroid: /android/gi.test(userAgent),
    isFromIos: /iphone|ipod|ios/gi.test(userAgent),
    isFromWx: /MicroMessenger/gi.test(userAgent),
    isFromQQ: /mobile.*qq/gi.test(userAgent),
    isFromUC: /ucbrowser/gi.test(userAgent),
    isFromQQBrower: /mqqbrowser[^LightApp]/gi.test(userAgent),
    isFromQQBrowerLight: /MQQBrowserLightApp/gi.test(userAgent)
  }
};