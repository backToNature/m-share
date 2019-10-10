/*
 * @Author: backtonature 
 * @Date: 2018-05-22 20:08:19 
 * @Last Modified by: backtonature
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
    background: #000;
    opacity: 0;
    -webkit-transition: opacity .2s ease-in;
    transition: opacity .2s ease-in;
  }
  #m-share-actionSheet {
    margin: 0;
    padding: 0;
    font-family: "PingFang SC",Arial,"\\5FAE\\8F6F\\96C5\\9ED1",Helvetica,sans-serif;
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    z-index: 2147483647;
    background: #fff;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 30px 20px;
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
    -webkit-transition: -webkit-transform .2s ease-in;
    transition: transform .2s ease-in;
  }
  #m-share-actionSheet div {
    margin: 0;
    padding: 0;
  }
  #m-share-actionSheet .m-share-sheet-title {
    font-size: 12px;
    color: #ababab;
    text-align: center;
    margin:10px 0 0 0;
  }
  #m-share-actionSheet .m-share-flex {
    display: -webkit-box!important;
    display: -webkit-flex!important;
    display: -ms-flexbox!important;
    display: flex!important;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap
  }
  #m-share-actionSheet .m-share-flex>.m-share-cell {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    width: 0;
    -webkit-flex-basis: 0;
    -ms-flex-preferred-size: 0;
    flex-basis: 0;
    max-width: 100%;
    display: block;
    padding: 0!important;
    position: relative;
    text-align: center;
  }
  #m-share-actionSheet .m-share-iconfont {
    margin: 0;
  }
  .m-share-tips {
    font-family: "PingFang SC",Arial,"\\5FAE\\8F6F\\96C5\\9ED1",Helvetica,sans-serif;
    margin: 0;
    padding: 0;
    position: fixed;
    top: 3px;
    color: #fff;
    right: 20px;
    z-index: 2147483647;
    // background-color: #000;
  }
  .m-share-tips .m-share-tips-w {
    margin: 0;
    padding: 0;
    display: inline-block;
    font-size: 18px;
    position: relative;
    right: 1px;
    top: 7px;
  }
  .m-share-tips .m-share-tips-w .m-share-tips-p {
    margin: 0;
    padding: 0;
    color: #fff;
    font-size: 18px;
  }
  .m-share-tips-arrow {
    margin: 0;
    padding: 0;
    display: inline-block;
    width: 54px;
    height: 55px;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAABuCAMAAAD1cAb0AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAC6UExURUdwTP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////3HoUvYAAAA9dFJOUwDIjg4CBPr98Av39C4GghgTQOAnv6h97AjcN2dGH+gcbxAVz1WWIqGvuko0tNP+5eN42YhaUF/WmsQ8Y8we7g2hAAAEn0lEQVQYGe3AVXbjSAAF0CcuMZllZnabE6ff/rc1Lqtp5rdVOfORiy9fvnz5nxvg8wyPBT7LY++LhYtPkdw92rXcxCewjivSrnXwCaxO4ZH87uIT5Os+STtKoZ7Z6fNJLFv4BDVKfjqGereM0v0M9QaRoCRSKGflW75kF6h3Zam/MaHaZudRck5dqBZv2yy1BxbUai0mLO1rBRS7zWz+cEigVnoW/GFfv0GpXpTxl0MPKvWiGn9bdaHQ6FjjHyYB1GkNF/yDc+pAnZvu8U+TIIQq6VmQwudPezGFKmmUkdrSoSTae7IZuFBjHmXke/yNktAzkmJoQol4oTn+yWhQct5nO5v0uy5UcOsTTraD+dLn016LNZL+2YUC7ptm3+uxNV1R8jf5xCZt3YUCtbadRTmMK1/01GjYpDObo2rhuEE2jw9gc6DUfjNCvUnapzEqZm0+yMM0BYxZm1IzALoZyXqOaoXdi2+LILZgdnS+3ACkGekceqjWbdhsag88halPqXY1gDxySC0wUaXrTIj6BZKr2Xzy3+YA3K1PsrBQoWDVb0YFXo6aw6f+EE/jq0/6QxfVGUwyMe2EkPKhT0kb4cmM7iSjMSozyLJv3cSCFMY7SqJI8GQNTiTrLqpi6dl7ARMvZo2St73gJdAcOnqOyqwvBX667RyS+2bdhWTGNZucJKiOYeGHgd6k1DZQGtcdOrM1FLC6S0reOkHJ0Gx6kxgKGFe+zKYmSvOZQ0fPocCgT+m0MPBD0ia91RjVGy/7fLLbAX5aR3s6tR4q1zpubUoN/JJopKPFJqrWOXuU3hITP+WRz714oGpu2qeUdQf4xbr2yeYlQcVa75R8/YHfzM3MtrUGqtagZK+O+FNrptXqLioWTPZ88pcu/sW9dBJULH9rUxI9/FeIihnH75T8aQjVrI83vgxzC6oFHx6l1bQF1QbrPqWsMYBqYfKdkr9IoV5EyXtvQL0GJUeru1AuZWkXQ7me4IvoQTkjYymFckaNpQbUq7GkmVCuwdIkMKBaylJ/HUC1nuCLPw2g2HiesTTsWFCrtzmwFG1aUCvpTliKYEKt0a3OUg2qjRoLvrTbBhRzFwuPUraNoVartd3ZlLRtALXcje45lDK9C7VGRYOlfpFCLXdR9yiJZieAUklSu9uUTqeHAaVGRZ2l9iKAUr3edskX73DpQKlH91vTobRr53MoFI47s4ylpZ5DodC9rL8JSnb7fR1DoXFcX3oszd6SFpSxRvGxLhxKTV+fGlCmhaL4nvHF7utTI4QilpV0dU1wT9LhbtfZQJWWMS2W77Qp+X29mMOEEta8NzyfhGNTEoeoMFwoEJrjXqo3DhPalGyxPD/GIf5WksCECRMlE61Rso7P0/u7ECyJg66P5jDxt+LGbHhbB904H82D3nUzvX4s6tru4LHk+dpkuBm0TPw9a6p5XibuWW21qi9PK+/OzLYdPjmO53ur3frozlGN8NHImsJ2bDrc8zeHTbHQ9HN3MDZRmTAdfNxW2/62eRdS29aaK205e/voBrEbomKW1XI7eRFE3eijMdQ7UV4kc8NIYEKZEC6SMAxh4sv/2T8XLefQYLd95QAAAABJRU5ErkJggg==');
    background-size: 100%;
  }
  .m-share-tips-bottom {
    font-family: "PingFang SC",Arial,"\\5FAE\\8F6F\\96C5\\9ED1",Helvetica,sans-serif;
    margin: 0;
    padding: 0;
    font-size: 18px;
    position: fixed;
    color: #fff;
    top: 50%;
    left: 50%;
    width: 100%;
    z-index: 2147483647;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    text-align: center;
    width: 240px;
    line-height: 1.72;
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
  .m-share-iconfont-menu {
    font-size: 12px;
  }
  .m-share-iconfont-menu:before {
    content: "\\e67e";
  }
  .m-share-iconfont-dots {
    font-size: 25px;
    color: #fff;
  }
  .m-share-iconfont-dots:before {
    content: "\\e656";
  }
  .m-share-iconfont-share {
    font-size: 17px;
    color: #fff;
    margin: 0;
  }
  .m-share-iconfont-share:before {
    content: "\\e6ae";
  }
  `
};

/*
 * @Author: backtonature 
 * @Date: 2018-05-27 20:08:19 
 * @Last Modified by: backtonature
 * @Last Modified time: 2018-05-30 21:05:38
 */

let isStyleLoaded = false;
var ui = {
  initStyle() {
    if (!isStyleLoaded) {
      util.execStyle(style.cssText);
      isStyleLoaded = true;
    }
  },
  showActionSheet(dom) {
    this.showMask();
    const $sheet = document.createElement('div');
    $sheet.id = 'm-share-actionSheet';
    $sheet.appendChild(dom);
    document.body.appendChild($sheet);
    window.setTimeout(() => {
      $sheet.style.cssText = '-webkit-transform: translateY(0);transform: translateY(0);';
    }, 0);
  },
  hideActionSheet() {
    const dom = document.querySelector('#m-share-actionSheet');
    if (dom) {
      // 渐变消失
      // dom.addEventListener('webkitTransitionend', () => {
      //   dom.remove();
      // });
      // dom.addEventListener('transitionend', () => {
      //   dom.remove();
      // });
      // dom.style.cssText = '-webkit-transform: translateY(100%);transform: translateY(100%);';
      dom.remove();
    }
  },
  showMask() {
    if (document.querySelector('.m-share-mask')) {
      return;
    }
    const $div = document.createElement('div');
    $div.className = 'm-share-mask';
    $div.addEventListener('click', () => {
      this.hideActionSheet();
      this.hideBottomTips();
      this.hideRightTips();
      this.hideMask();
    });
    document.body.appendChild($div);
    window.setTimeout(() => {
      $div.style.opacity = 0.7;
    }, 0);
  },
  hideMask() {
    const domList = document.querySelectorAll('.m-share-mask');
    for (let i = 0; i < domList.length; i++) {
      const item = domList[i];
      const removeDom = () => item.remove();
      // 渐变消失
      // item.addEventListener('webkitTransitionend', removeDom);
      // item.addEventListener('transitionend', removeDom);
      // item.style.cssText = 'opacity: 0';
      removeDom();
    }
  },
  showBottomTips() {
    this.showMask();
    const $tips = document.createElement('div');
    $tips.className = 'm-share-tips-bottom';
    $tips.innerHTML = '请打开浏览器的菜单进行分享点击“<i class="m-share-iconfont m-share-iconfont-menu"></i>”或“<i class="m-share-iconfont m-share-iconfont-share"></i>”';
    document.body.appendChild($tips);
    window.setTimeout(() => {
      this.hideMask();
      this.hideBottomTips();
    }, 1400);
  },
  hideBottomTips() {
    const domList = document.querySelectorAll('.m-share-tips-bottom');
    for (let i = 0; i < domList.length; i++) {
      const item = domList[i];
      item.remove();
    }
  },
  showRightTopTips() {
    this.showMask();
    const $tips = document.createElement('div');
    $tips.className = 'm-share-tips';
    $tips.innerHTML = `
      <div class="m-share-tips-w">
        <div class="m-share-tips-p">点击右上角“<i class="m-share-iconfont m-share-iconfont-dots"></i>”</div>
        <div class="m-share-tips-p">分享给朋友吧！</div>
      </div>
      <div class="m-share-tips-arrow"></div>
    `;
    document.body.appendChild($tips);
    window.setTimeout(() => {
      this.hideMask();
      this.hideRightTips();
    }, 1400);
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
 * @Author: backToNature 
 * @Date: 2018-05-30 12:54:24 
 * @Last Modified by: backToNature
 * @Last Modified time: 2018-05-30 13:39:38
 */
var setNormalShareInfo = (info) => {
  if (info.desc && !document.querySelector('meta[name$="cription"]')) {
    const $meta = document.createElement('meta');
    $meta.setAttribute('description', info.desc);
  }
  // 添加隐藏的img标签在body最前面
  if (info.imgUrl) {
    const $img = document.createElement('img');
    $img.style.cssText = 'width: 0;height: 0;position: absolute;z-index: -9999;top: -99999px;left: -99999px;';
    $img.onload = () => {
      document.body.insertBefore($img, document.body.firstChild);
    };
    $img.onerror = () => {
      $img.remove();
    };
    $img.src = info.imgUrl;
  }
};

/*
 * @Author: backtonature 
 * @Date: 2018-05-22 21:31:32 
 * @Last Modified by: backToNature
 * @Last Modified time: 2018-05-23 20:05:09
 */
const qqJsSdkUrl = '//open.mobile.qq.com/sdk/qqapi.js?_bid=152';

const setShareInfo = (info) => {
  mqq.data.setShareInfo({
    share_url: info.link,
    title: info.title,
    desc: info.desc,
    image_url: info.imgUrl
  });
};

var setQQshareInfo = (info) => {
  if (window.mqq && mqq.data && mqq.data.setShareInfo) {
    setShareInfo(info);
  } else {
    util.loadScript(qqJsSdkUrl, () => {
      setShareInfo(info);
    });
  }
};

/*
 * @Author: backToNature 
 * @Date: 2018-05-22 17:23:35 
 * @Last Modified by: backToNature
 * @Last Modified time: 2018-05-30 17:39:03
 */

let isInit = false;

var init = (config) => {
  if (!isInit) {
    const info = {
      title: config.title,
      desc: config.desc,
      link: config.link,
      imgUrl: config.imgUrl
    };
    isInit = true;
    ui.initStyle(); // 加载样式

    // 配置通用分享设置
    if (config.setNormal !== false) {
      setNormalShareInfo(info);
    }
     // 配置手q分享内容
     if (util.ua.isFromQQ) {
      setQQshareInfo(config.types, info);
    }

  }
};

/*
 * @Author: backToNature 
 * @Date: 2018-05-22 20:12:58 
 * @Last Modified by: backToNature
 * @Last Modified time: 2018-05-31 15:16:45
 */
const wxJsSdkUrl = '//res.wx.qq.com/open/js/jweixin-1.2.0.js';

const setShareInfo$1 = (type, info) => {
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
      break
  }
};

let isConfig = false;

var setWxShareInfo = (types, config) => {
  const wxConfig = config.wx;
  const doSet = () => {
    const _wxConfig = Object.assign({
      jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone', 'onMenuShareWeibo']
    }, wxConfig);
    if (!isConfig) {
      wx.config(_wxConfig);
      isConfig = true;
    }
    wx.ready(() => {
      try {
        types.forEach(item => {
          const _info = {
            title: (config.infoMap && config.infoMap[item] && config.infoMap[item].title) || config.title,
            desc: (config.infoMap && config.infoMap[item] && config.infoMap[item].desc) || config.desc,
            link: (config.infoMap && config.infoMap[item] && config.infoMap[item].link) || config.link,
            imgUrl: (config.infoMap && config.infoMap[item] && config.infoMap[item].imgUrl) || config.imgUrl
          };
          setShareInfo$1(item, _info);
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
 * @Date: 2018-05-23 21:36:23 
 * @Last Modified by: backtonature
 * @Last Modified time: 2018-05-29 14:05:55
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
        });
      } catch (e) {
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
 * @Last Modified by: backtonature
 * @Last Modified time: 2018-06-01 15:07:06
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
    ui.hideMask();
    if (util.ua.isFromIos) {
      window.ucbrowser && window.ucbrowser.web_share(info.title, info.desc, info.link, 'kWeixin', info.imgUrl, '', '');
    } else {
      window.ucweb && window.ucweb.startRequest("shell.page_share", [info.title, info.desc, info.link, 'WechatFriends', info.imgUrl, '']);
    }
    return;
  }

  if (util.ua.isFromQQBrower) {
    // qq浏览器
    ui.hideMask();
    qqBrowserShare('wx', info);
    return;
  }

  ui.showBottomTips();
};

/*
 * @Author: backtonature 
 * @Date: 2018-05-24 14:17:21 
 * @Last Modified by: backtonature
 * @Last Modified time: 2018-06-01 15:05:57
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
    ui.hideMask();
    if (util.ua.isFromIos) {
      window.ucbrowser && window.ucbrowser.web_share(info.title, info.desc, info.link, 'kWeixinFriend', info.imgUrl, '', '');
    } else {
      window.ucweb && window.ucweb.startRequest("shell.page_share", [info.title, info.desc, info.link, 'WechatTimeline', info.imgUrl, '']);
    }
    return;
  }

  if (util.ua.isFromQQBrower) {
    // qq浏览器
    ui.hideMask();
    qqBrowserShare('wxline', info);
    return;
  }

  ui.showBottomTips();
};

/*
 * @Author: backtonature 
 * @Date: 2018-05-24 14:23:11 
 * @Last Modified by: backtonature
 * @Last Modified time: 2018-06-01 15:05:25
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
    ui.hideMask();
    qqBrowserShare('qq', info);
    return;
  }

  ui.showBottomTips();
};

/*
 * @Author: backtonature 
 * @Date: 2018-05-24 14:23:11 
 * @Last Modified by: backtonature
 * @Last Modified time: 2018-06-01 15:05:26
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
    ui.hideMask();
    qqBrowserShare('qzone', info);
    return;
  }
  const query = `url=${encodeURIComponent(info.link)}&title=${encodeURIComponent(info.title)}&desc=${encodeURIComponent(info.desc)}&summary=${encodeURIComponent(info.desc)}&site=${encodeURIComponent(info.link)}`;
  location.href = `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?${query}`;
};

/*
 * @Author: backtonature 
 * @Date: 2018-05-24 14:23:11 
 * @Last Modified by: backtonature
 * @Last Modified time: 2018-06-01 15:05:39
 */

var sinaShare = (info) => {
  if (util.ua.isFromQQBrower) {
    // qq浏览器
    ui.hideMask();
    qqBrowserShare('sina', info);
    return;
  }

  const query = `url=${encodeURIComponent(info.link)}&title=${encodeURIComponent(info.desc)}&desc=${encodeURIComponent(info.desc)}&pic=${encodeURIComponent(info.imgUrl)}`;
  location.href = `http://service.weibo.com/share/share.php?${query}`;
  // 都不是则弹层二维码提示分享
};

/*
 * @Author: backToNature 
 * @Date: 2018-05-22 17:23:35 
 * @Last Modified by: backToNature
 * @Last Modified time: 2018-06-01 15:00:51
 */

const shareFuncMap = {
  wx: wxShare,
  wxline: wxlineShare,
  qq: qqShare,
  qzone: qzoneShare,
  sina: sinaShare
};

const typesMap = ['wx', 'wxline', 'qq', 'qzone', 'sina'];

const getDefaultConfig = (config) => {
  config = config || {};
  const infoMapType = typeof config.infoMap;
  return {
    title: (config && config.title) || document.title,
    desc: (config && config.desc) || (document.querySelector('meta[name$="cription"]') && document.querySelector('meta[name$="cription"]').getAttribute('content')) || '',
    link: encodeURI((config && config.link) || window.location.href),
    imgUrl: (config && config.imgUrl) || (document.querySelector('img') && document.querySelector('img').getAttribute('src')) || '',
    types: (config && Array.isArray(config.types) && config.types) || ['wx', 'wxline', 'qq', 'qzone', 'sina'],
    wx: (config && config.wx) || null,
    fnDoShare: config.fnDoShare,
    infoMap: (infoMapType === 'function' || infoMapType === 'object' && !!config.infoMap) ? config.infoMap : {}
  };
};

var index = {
  wxConfig(config) {
    const _config = getDefaultConfig(config);
    if (util.ua.isFromWx && _config.wx && _config.wx.appId && _config.wx.timestamp && _config.wx.nonceStr && _config.wx.signature) {
      setWxShareInfo(typesMap, _config);
    }
  },
  init(config) {
    const _config = getDefaultConfig(config);
    init(_config);
    const domList = document.querySelectorAll('.m-share');
    // 初始化
    for (let i = 0; i < domList.length; i++) {
      const item = domList[i];
      this.render(item, _config);
    }
  },
  // 渲染
  render(dom, config) {
    const _config = getDefaultConfig(config);
    init(_config);
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
    if (typeof dom === 'string') {
      dom = document.querySelector(dom);
    }
    if (!dom) {
      return;
    }
    dom.innerHTML = tmp;
    dom.addEventListener('click', (e) => {
      const target = e.target;
      typesMap.forEach(item => {
        if (target.classList.contains(`m-share-${item}`)) {
          const shareData = {
            title: (_config.infoMap && _config.infoMap[item] && _config.infoMap[item].title) || _config.title,
            desc: (_config.infoMap && _config.infoMap[item] && _config.infoMap[item].desc) || _config.desc,
            link: (_config.infoMap && _config.infoMap[item] && _config.infoMap[item].link) || _config.link,
            imgUrl: (_config.infoMap && _config.infoMap[item] && _config.infoMap[item].imgUrl) || _config.imgUrl,
            fnDoShare: _config.fnDoShare
          };
          this.to(item, shareData);
        }
      });
    });
  },
  // 执行分享逻辑
  to(type, config) {
    const _config = getDefaultConfig(config);
    init(_config);
    if (typesMap.indexOf(type) >= 0) {
      if (_config.fnDoShare) {
        _config.fnDoShare(type);
      }
      shareFuncMap[type](_config);
    }
  },
  // 弹层分享
  popup(config) {
    const _config = getDefaultConfig(config);
    init(_config);
    const textMap = {
      wx: '微信好友',
      wxline: '朋友圈',
      qq: 'QQ好友',
      qzone: 'QQ空间',
      sina: '微博'
    };
    const dom = document.createElement('div');
    dom.className = 'm-share-flex';
    let tmp = '';
    const getTmpl = (type) => {
      if (typesMap.indexOf(type) >= 0) {
        return `<div class="m-share-cell"><i class="m-share-${type} m-share-iconfont m-share-iconfont-${type}"></i><div class="m-share-sheet-title">${textMap[type]}</div></div>`;
      }
      return '';
    };
    _config.types.forEach(item => {
      tmp += getTmpl(item);
    });
    dom.innerHTML = tmp;   
    dom.addEventListener('click', (e) => {
      const target = e.target;
      typesMap.forEach(item => {
        if (target.classList.contains(`m-share-${item}`)) {
          ui.hideActionSheet();
          const shareData = {
            title: (_config.infoMap && _config.infoMap[item] && _config.infoMap[item].title) || _config.title,
            desc: (_config.infoMap && _config.infoMap[item] && _config.infoMap[item].desc) || _config.desc,
            link: (_config.infoMap && _config.infoMap[item] && _config.infoMap[item].link) || _config.link,
            imgUrl: (_config.infoMap && _config.infoMap[item] && _config.infoMap[item].imgUrl) || _config.imgUrl,
            fnDoShare: _config.fnDoShare
          };
          this.to(item, shareData);
        }
      });
    });
    ui.showActionSheet(dom);
  }
};

export default index;
