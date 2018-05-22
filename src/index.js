/*
 * @Author: backToNature 
 * @Date: 2018-05-22 17:23:35 
 * @Last Modified by: daringuo
 * @Last Modified time: 2018-05-22 21:41:50
 */
import util from './util.js';
import setWxShareInfo from './set-wx-share-info.js';

export default {
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

  },
  render() {

  },
  to() {

  }
};