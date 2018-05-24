(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Mshare = factory());
}(this, (function () { 'use strict';

  /*
   * @Author: backtonature 
   * @Date: 2018-05-22 20:08:19 
   * @Last Modified by:   backtonature 
   * @Last Modified time: 2018-05-22 20:08:19 
   */
  const userAgent = window.navigator.userAgent;
  var util = {
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

  /*
   * @Author: daringuo 
   * @Date: 2018-05-22 20:12:58 
   * @Last Modified by: daringuo
   * @Last Modified time: 2018-05-22 21:27:27
   */
  const wxJsSdkUrl = '//res.wx.qq.com/open/js/jweixin-1.2.0.js';

  const setShareInfo = (type, info) => {
    switch (type) {
      case 'wx':
        wx.onMenuShareAppMessage(info); // 设置分享到微信好友内容
        break;
      case 'wxline':
        wx.onMenuShareTimeline(info); // 设置分享到微信朋友圈内容
        break;
      case 'qq':
        wx.onMenuShareQQ(info); // 设置分享到微信好友内容
        break;
      case 'qzone':
        wx.onMenuShareQZone(info); // 设置分享到qq空间
        break;
    }
  };

  let isConfig = false;

  var setWxShareInfo = (types, wxConfig, info) => {
    const doSet = () => {
      const _config = Object.assign({
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone']
      }, wxConfig);
      if (!isConfig) {
        wx.config(_config);
        isConfig = true;
      }
      wx.ready(() => {
        try {
          types.forEach(item => {
            setShareInfo(item, info);
          });
        } catch (e) {}
      });
    };
    if (window.wx) {
      doSet();
    } else {
      util.loadScript(wxJsSdkUrl, () => {
        doSet();
      });
    }
  };

  /*
   * @Author: backtonature 
   * @Date: 2018-05-22 21:31:32 
   * @Last Modified by: daringuo
   * @Last Modified time: 2018-05-23 20:05:09
   */
  const qqJsSdkUrl = '//open.mobile.qq.com/sdk/qqapi.js?_bid=152';

  const setShareInfo$1 = (info) => {
    mqq.data.setShareInfo({
      share_url: info.link,
      title: info.title,
      desc: info.desc,
      image_url: info.imgUrl
    });
  };

  var setQQshareInfo = (info) => {
    if (window.mqq && mqq.data && mqq.data.setShareInfo) {
      setShareInfo$1(info);
    } else {
      util.loadScript(qqJsSdkUrl, () => {
        setShareInfo$1(info);
      });
    }
  };

  /*
   * @Author: backtonature 
   * @Date: 2018-05-23 21:36:23 
   * @Last Modified by: daringuo
   * @Last Modified time: 2018-05-24 12:14:06
   */

  /*
   * @Author: backtonature 
   * @Date: 2018-05-23 21:20:45 
   * @Last Modified by: daringuo
   * @Last Modified time: 2018-05-24 14:21:03
   */

  /*
   * @Author: backtonature 
   * @Date: 2018-05-24 14:17:21 
   * @Last Modified by: daringuo
   * @Last Modified time: 2018-05-24 14:24:17
   */

  /*
   * @Author: backtonature 
   * @Date: 2018-05-24 14:23:11 
   * @Last Modified by: daringuo
   * @Last Modified time: 2018-05-24 14:25:16
   */

  /*
   * @Author: backtonature 
   * @Date: 2018-05-24 14:23:11 
   * @Last Modified by: daringuoture
   * @Last Modified time: 2018-05-24 14:24:41
   */

  /*
   * @Author: backtonature 
   * @Date: 2018-05-24 14:23:11 
   * @Last Modified by: daringuo
   * @Last Modified time: 2018-05-24 14:25:41
   */

  /*
   * @Author: backToNature 
   * @Date: 2018-05-22 17:23:35 
   * @Last Modified by: daringuo
   * @Last Modified time: 2018-05-24 14:30:45
   */

  const typesMap = ['wx', 'wxline', 'qq', 'qzone', 'sina'];

  var index = {
    init(config) {
      const _config = {
        title: (config && config.title) || document.title,
        desc: (config && config.desc) || (document.querySelector('meta[name$="cription"]') && document.querySelector('meta[name$="cription"]').getAttribute('content')) || '',
        link: (config && config.link) || window.location.href,
        imgUrl: (config && config.imgUrl) || (document.querySelector('img') && document.querySelector('img').getAttribute('src')) || '',
        types: (config && Array.isArray(config.types) && config.types) || ['wx', 'wxline', 'qq', 'qzone', 'sina'],
        wx: (config && config.wx) || null
      };
      const info = {
        title: _config.title,
        desc: _config.desc,
        link: _config.link,
        imgUrl: _config.imgUrl
      };

      // 如果有微信参数，则配置微信分享内容
      if (util.ua.isFromWx && _config.wx && _config.wx.appId && _config.wx.timestamp && _config.wx.nonceStr && _config.wx.signature) {
        setWxShareInfo(config.types, _config, info);
      }

      // 配置手q分享内容
      if (util.ua.isFromQQ) {
        setQQshareInfo(config.types, info);
      }

      const domList = document.querySelectorAll('.m-share');
      
      // 初始化
      domList.forEach(item => {
        this.render(item, _config);
      });

    },
    // 渲染
    render(dom, config) {
      const _config = {
        title: dom.getAttribute('data-title') || config.title,
        desc: dom.getAttribute('data-desc') || config.desc,
        link: dom.getAttribute('data-link') || config.link,
        imgUrl: dom.getAttribute('data-imgUrl') || config.imgUrl,
        types: (dom.getAttribute('data-types') && dom.getAttribute('data-types').split(',')) || config.types
      };
      const getTmpl = (type) => {
        if (typesMap.indexOf(type) >= 0) {
          return `<button class="m-share-${type}">${type}</button>`;
        }
        return '';
      };
      let tmp = '';
      _config.types.forEach(item => {
        tmp += getTmpl(item);
      });
      dom.innerHTML = tmp;
      dom.addEventListener('click', (e) => {
        typesMap.forEach(item => {
          if (e.target.classList.contains(`m-share-${item}`)) {
            this.to(item);
          }
        });
      });
    },
    // 执行分享逻辑
    to(type, info) {
    },
    // 弹出弹层进行分享
    popup(config) {
      
    }
  };

  return index;

})));
