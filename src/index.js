/*
 * @Author: backToNature 
 * @Date: 2018-05-22 17:23:35 
 * @Last Modified by: daringuo
 * @Last Modified time: 2018-05-30 17:39:03
 */
import util from './util.js';
import ui from './ui.js';
import setWxShareInfo from './set-wx-share-info.js';
import setQQshareInfo from './set-qq-share-info.js';
import setNormalShareInfo from './set-normal-share-info.js';
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

export default {
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
    if (config.setNormal !== false) {
      setNormalShareInfo(info);
    }

    // 如果有微信参数，则配置微信分享内容
    if (util.ua.isFromWx && _config.wx && _config.wx.appId && _config.wx.timestamp && _config.wx.nonceStr && _config.wx.signature) {
      setWxShareInfo(config.types, _config.wx, info);
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
      const target = e.target;
      typesMap.forEach(item => {
        if (target.classList.contains(`m-share-${item}`)) {
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
  }
};