/*
 * @Author: backToNature 
 * @Date: 2018-05-22 20:12:58 
 * @Last Modified by: backToNature
 * @Last Modified time: 2018-05-31 15:16:45
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
      break
  }
};

let isConfig = false;

export default (types, config) => {
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
          setShareInfo(item, _info);
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
