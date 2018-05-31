/*
 * @Author: backToNature 
 * @Date: 2018-05-22 17:23:35 
 * @Last Modified by: daringuo
 * @Last Modified time: 2018-05-31 17:16:09
 */
import util from './util.js';
import ui from './ui.js';
import init from './init.js';
import setWxShareInfo from './set-wx-share-info.js';
import wxShare from './handle-share/wx.js';
import wxlineShare from './handle-share/wxline.js';
import qqShare from './handle-share/qq.js';
import qzoneShare from './handle-share/qzone.js';
import sinaShare from './handle-share/sina.js';

const shareFuncMap = {
  wx: wxShare,
  wxline: wxlineShare,
  qq: qqShare,
  qzone: qzoneShare,
  sina: sinaShare
};

const typesMap = ['wx', 'wxline', 'qq', 'qzone', 'sina'];

const getDefaultConfig = (config) => {
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

export default {
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