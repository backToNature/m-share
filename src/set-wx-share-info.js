/*
 * @Author: daringuo 
 * @Date: 2018-05-22 20:12:58 
 * @Last Modified by: daringuo
 * @Last Modified time: 2018-05-22 21:27:27
 */
import util from './util.js';
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

export default (types, wxConfig, info) => {
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
