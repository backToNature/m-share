/*
 * @Author: backtonature 
 * @Date: 2018-05-23 21:36:23 
 * @Last Modified by: daringuo
 * @Last Modified time: 2018-05-24 12:14:06
 */

import util from '../util.js';

const qqShareJsSdk = '//jsapi.qq.com/get?api=app.setShareInfo,app.share';

export default (type, info) => {
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