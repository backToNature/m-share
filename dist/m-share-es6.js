/*
 * @Author: backtonature 
 * @Date: 2018-05-22 20:08:19 
 * @Last Modified by: daringuo
 * @Last Modified time: 2018-05-29 11:24:07
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

var style = {
  cssText: `
  .m-share-mask {
    margin: 0;
    padding: 0;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 2147483646;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.3);
    -webkit-transition: opacity .2s ease-in,z-index .2s ease-in;
    transition: opacity .2s ease-in,z-index .2s ease-in;
  }
  .m-share-tips {
    margin: 0;
    padding: 0;
    position: fixed;
    top: 3px;
    width: 217.5px;
    height: 112.5px;
    right: 3px;
    z-index: 2147483647;
    // background-color: #000;
    background-image: url('data:image/png;base64,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');
    background-size: 100%;
  }
  @font-face {font-family: "m-share-iconfont";
    src: url('data:application/x-font-ttf;charset=utf-8;base64,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') format('truetype'); /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
  }
  .m-share-iconfont {
    font-family:"m-share-iconfont" !important;
    font-size:26px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    padding: 5px;
    margin:0 0 0 10px;
  }
  .m-share-iconfont:first-child {
    margin: 0;
  }
  .m-share-iconfont-wx {
    color: #7bc549;
    border: 1px solid #7bc549;
    border-radius: 100%;
  }
  .m-share-iconfont-wx:active {
    background: #7bc549;
    color: #fff;
  }
  .m-share-iconfont-wx:before {
    content: "\\e61e";
  }
  .m-share-iconfont-sina {
    color: #ff763b;
    border: 1px solid #ff763b;
    border-radius: 100%;
  }
  .m-share-iconfont-sina:active {
    background: #ff763b;
    color: #fff;
  }
  .m-share-iconfont-sina:before {
    content: "\\e641";
  }
  .m-share-iconfont-qzone {
    color: #fdbe3d;
    border: 1px solid #fdbe3d;
    border-radius: 100%;
  }
  .m-share-iconfont-qzone:active {
    background: #fdbe3d;
    color: #fff;
  }
  .m-share-iconfont-qzone:before {
    content: "\\e728";
  }
  .m-share-iconfont-qq {
    color: #56b6e7;
    border: 1px solid #56b6e7;
    border-radius: 100%;
  }
  .m-share-iconfont-qq:active {
    background: #56b6e7;
    color: #fff;
  }
  .m-share-iconfont-qq:before {
    content: "\\e630";
  }
  .m-share-iconfont-wxline {
    color: #33b045;
    border: 1px solid #33b045;
    border-radius: 100%;
  }
  .m-share-iconfont-wxline:active {
    background: #33b045;
    color: #fff;
  }
  .m-share-iconfont-wxline:before {
    content: "\\e6e9";
  }
  `
};

/*
 * @Author: backtonature 
 * @Date: 2018-05-27 20:08:19 
 * @Last Modified by: daringuo
 * @Last Modified time: 2018-05-29 12:58:10
 */

let isStyleLoaded = false;
var ui = {
  initStyle() {
    if (!isStyleLoaded) {
      util.execStyle(style.cssText);
      isStyleLoaded = true;
    }
  },
  showMask() {
    const $div = document.createElement('div');
    $div.className = 'm-share-mask';
    document.body.appendChild($div);
  },
  hideMask() {
    const domList = document.querySelectorAll('.m-share-mask');
    for (let i = 0; i < domList.length; i++) {
      const item = domList[i];
      item.remove();
    }
  },
  showRightTopTips(text) {
    this.showMask();
    const $tips = document.createElement('div');
    $tips.className = 'm-share-tips';
    document.body.appendChild($tips);
    window.setTimeout(() => {
      this.hideMask();
      this.hideRightTips();
    }, 2000);
  },
  hideRightTips() {
    const domList = document.querySelectorAll('.m-share-tips');
    for (let i = 0; i < domList.length; i++) {
      const item = domList[i];
      item.remove();
    }
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

const qqShareJsSdk = '//jsapi.qq.com/get?api=app.setShareInfo,app.share';

var qqBrowserShare = (type, info) => {
  const doShare = (to_app) => {
    const _doShare = () => {
      try {
        browser.app.share({
          title: info.title,
          description: info.desc,
          url: info.link,
          img_url: info.imgUrl,
          to_app
        }, (res) => {
          alert(res);
        });
      } catch (e) {
        alert(JSON.stringify(e));
      }
    };
    if (window.browser && browser.app && browser.app.share) {
      _doShare();
    } else {
      util.loadScript(qqShareJsSdk, _doShare);
    }
  };
  switch (type) {
    case 'wx':
      doShare(1);
      break;
    case 'wxline':
      doShare(8);
      break;
    case 'qq':
      doShare(4);
      break;
    case 'qzone':
      doShare(3);
      break;
    case 'sina':
      doShare(11);
      break;
  }
};

/*
 * @Author: backtonature 
 * @Date: 2018-05-23 21:20:45 
 * @Last Modified by: daringuo
 * @Last Modified time: 2018-05-29 10:38:13
 */

var wxShare = (info) => {
  if (util.ua.isFromWx) {
    ui.showRightTopTips();
    return;
  }

  if (util.ua.isFromQQ) {
    ui.showRightTopTips();
    return;
  }

  if (util.ua.isFromUC) {
    // uc浏览器
    if (util.ua.isFromIos) {
      window.ucbrowser && window.ucbrowser.web_share(info.title, data.imgUrl, data.link, 'kWeixin', '', '', '');
    } else {
      window.ucweb && window.ucweb.startRequest("shell.page_share", [info.title, data.imgUrl, data.link, 'WechatFriends', '', '']);
    }
    return;
  }

  if (util.ua.isFromQQBrower) {
    // qq浏览器
    qqBrowserShare('wx', info);
    return;
  }

  // 都不是则弹层二维码提示分享
  

};

/*
 * @Author: backtonature 
 * @Date: 2018-05-24 14:17:21 
 * @Last Modified by: daringuo
 * @Last Modified time: 2018-05-29 12:29:22
 */

var wxlineShare = (info) => {
  if (util.ua.isFromWx) {
    // 微信客户端
    ui.showRightTopTips();
    return;
  }

  if (util.ua.isFromQQ) {
    // 手机qq
    ui.showRightTopTips();
    return;
  }

  if (util.ua.isFromUC) {
    // uc浏览器
    if (util.ua.isFromIos) {
      window.ucbrowser && window.ucbrowser.web_share(info.title, data.imgUrl, data.link, 'kWeixinFriend', '', '', '');
    } else {
      window.ucweb && window.ucweb.startRequest("shell.page_share", [info.title, data.imgUrl, data.link, 'WechatTimeline', '', '']);
    }
    return;
  }

  if (util.ua.isFromQQBrower) {
    // qq浏览器
    qqBrowserShare('wxline', info);
    return;
  }

  // 都不是则弹层二维码提示分享
};

/*
 * @Author: backtonature 
 * @Date: 2018-05-24 14:23:11 
 * @Last Modified by: daringuo
 * @Last Modified time: 2018-05-29 12:29:08
 */

var qqShare = (info) => {
  if (util.ua.isFromWx) {
    // 微信客户端
    ui.showRightTopTips();
    return;
  }

  if (util.ua.isFromQQ) {
    // 手机qq
    ui.showRightTopTips();
    return;
  }

  if (util.ua.isFromQQBrower) {
    // qq浏览器
    qqBrowserShare('qq', info);
    return;
  }

  // 都不是则弹层二维码提示分享
  

};

/*
 * @Author: backtonature 
 * @Date: 2018-05-24 14:23:11 
 * @Last Modified by: daringuo
 * @Last Modified time: 2018-05-29 12:29:13
 */

var qzoneShare = (info) => {
  if (util.ua.isFromWx) {
    // 微信客户端
    ui.showRightTopTips();
    return;
  }

  if (util.ua.isFromQQ) {
    // 手机qq
    ui.showRightTopTips();
    return;
  }

  if (util.ua.isFromQQBrower) {
    // qq浏览器
    qqBrowserShare('qzone', info);
    return;
  }
  const query = `url=${encodeURIComponent(info.link)}&title=${encodeURIComponent(info.title)}&desc=${encodeURIComponent(info.desc)}&summary=${encodeURIComponent(info.desc)}&site=${encodeURIComponent(info.link)}`;
  location.href = `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?${query}`;
};

/*
 * @Author: backtonature 
 * @Date: 2018-05-24 14:23:11 
 * @Last Modified by: daringuo
 * @Last Modified time: 2018-05-29 12:29:51
 */

var sinaShare = (info) => {
  if (util.ua.isFromQQBrower) {
    // qq浏览器
    qqBrowserShare('sina', info);
    return;
  }

  const query = `url=${encodeURIComponent(info.link)}&title=${encodeURIComponent(info.title)}&desc=${encodeURIComponent(info.desc)}&pic=${encodeURIComponent(info.imgUrl)}`;
  location.href = `http://service.weibo.com/share/share.php?${query}`;
  // 都不是则弹层二维码提示分享
};

/*
 * @Author: backToNature 
 * @Date: 2018-05-22 17:23:35 
 * @Last Modified by: daringuo
 * @Last Modified time: 2018-05-29 12:56:53
 */

const shareFuncMap = {
  wx: wxShare,
  wxline: wxlineShare,
  qq: qqShare,
  qzone: qzoneShare,
  sina: sinaShare
};

const typesMap = ['wx', 'wxline', 'qq', 'qzone', 'sina'];

var index = {
  init(config) {
    ui.initStyle();
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
    for (let i = 0; i < domList.length; i++) {
      const item = domList[i];
      this.render(item, _config);
    }
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
        return `<i class="m-share-${type} m-share-iconfont m-share-iconfont-${type}"></i>`;
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
          this.to(item, {
            title: _config.title,
            desc: _config.desc,
            link: _config.link,
            imgUrl: _config.imgUrl
          });
        }
      });
    });
  },
  // 执行分享逻辑
  to(type, info) {
    if (typesMap.indexOf(type) >= 0) {
      shareFuncMap[type](info);
    }
  },
  // 弹出弹层进行分享
  popup(config) {
    
  }
};

export default index;
