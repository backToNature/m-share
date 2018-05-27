const userAgent = window.navigator.userAgent;

const util = {
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

const apiMap = {
  qqBrowser: '//jsapi.qq.com/get?api=app.setShareInfo,app.share'
};

const data = {
  app_name: '征文大赛',
  title: '分享测试',
  description: '我在测试分享',
  url: window.location.href,
  img_url: 'http://d.hiphotos.baidu.com/image/pic/item/9345d688d43f8794f7940c9ede1b0ef41bd53a12.jpg',
};

const qqShare = (data) => {
  const _doShare = () => {
    alert(JSON.stringify({
      title: data.title,
      description: data.description,
      url: data.url,
      img_url: data.img,
      to_app: data.to_app
    }));
    // alert(data.title, data.description, data.url, data.img, data.to_app);
    window.browser && browser.app && browser.app.share && browser.app.share({
      title: data.title,
      description: data.description,
      url: data.url,
      img_url: data.img,
      to_app: data.to_app
    }, function (res) {
      alert(res);
    })
  };
  if (!window.browser) {
    util.loadScript(apiMap.qqBrowser, () => {
      _doShare();
    });
  } else {
    _doShare();
  }
};

const ucShare = (type, data) => {
  let str = '';
  if (util.ua.isFromIos) {
    type === 2 ? str = 'kWeixinFriend' : str = 'kWeixin';
    window.ucbrowser && window.ucbrowser.web_share(data.title, data.img_url, data.url, str, '', '', '');
  }
  if (util.ua.isFromAndroid) {
    type === 2 ? str = 'WechatTimeline' : str = 'WechatFriends';
    window.ucweb && window.ucweb.startRequest("shell.page_share", [data.title, data.img_url, data.url, str, '', '', ''])
  }
};



window.QbShare = {
  weixin() {
    if (util.ua.isFromWx) {
      alert('微信右上角给出提示');
      // 微信右上角给出提示
    }
    if (util.ua.isFromQQ) {
      alert('qq右上角给出提示');
      // qq右上角给出提示
    }
    if (util.ua.isFromUC) {
      // alert(1);
      ucShare(1, data);
    }
    if (util.ua.isFromQQBrower) {
      const _data = Object.assign({to_app: 1}, data);
      qqShare(_data);
    }
  },
  wexinFriend() {
    if (util.ua.isFromWx) {
      alert('微信右上角给出提示');
      // 微信右上角给出提示
    }
    if (util.ua.isFromQQ) {
      alert('qq右上角给出提示');
      // qq右上角给出提示
    }
    if (util.ua.isFromUC) {
      // alert(1);
      ucShare(2, data);
    }
    if (util.ua.isFromQQBrower) {
      const _data = Object.assign({to_app: 8}, data);
      qqShare(_data);
    }
  },
  qzone() {
    if (util.ua.isFromWx) {
      alert('微信右上角给出提示');
      return;
      // 微信右上角给出提示
    }
    if (util.ua.isFromQQ) {
      alert('qq右上角给出提示');
      return;
      // qq右上角给出提示
    }
    if (util.ua.isFromQQBrower) {
      const _data = Object.assign({to_app: 3}, data);
      qqShare(_data);
      return;
    }
    // 走web网页版分享
    const query= ["title=" + encodeURIComponent(data.title), "imageUrl=" + encodeURIComponent(data.img_url), "desc=" + encodeURIComponent(data.description), "summary=" + encodeURIComponent(data.description), "url=" + encodeURIComponent(data.url), "successUrl=" + encodeURIComponent(data.url), "failUrl=" + encodeURIComponent(data.url), "callbackUrl=" + encodeURIComponent(data.url)].join("&");
    const qzoneUrl = "http://openmobile.qq.com/api/check2?page=qzshare.html&loginpage=loginindex.html&logintype=qzone";
    window.location.href = qzoneUrl + "&" + query;
  },
  qq() {
    if (util.ua.isFromWx) {
      alert('微信右上角给出提示');
      return;
      // 微信右上角给出提示
    }
    if (util.ua.isFromQQ) {
      alert('qq右上角给出提示');
      return;
      // qq右上角给出提示
    }
    if (util.ua.isFromQQBrower) {
      const _data = Object.assign({to_app: 4}, data);
      qqShare(_data);
      return;
    }
  },
  weibo() {
    if (util.ua.isFromWx) {
      alert('微信右上角给出提示');
      return;
      // 微信右上角给出提示
    }
    const query = ["title=" + encodeURIComponent(data.title), "pic=" + encodeURIComponent(data.img_url), "url=" + encodeURIComponent(data.url)].join("&");;
    const weiboUrl = 'http://service.weibo.com/share/share.php?' + query;
    location.href = weiboUrl;
  }
};