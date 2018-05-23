/*
 * @Author: backtonature 
 * @Date: 2018-05-23 21:36:23 
 * @Last Modified by: daringuo
 * @Last Modified time: 2018-05-23 21:44:01
 */

const qqShareJsSdk = '//jsapi.qq.com/get?api=app.setShareInfo,app.share';

export default (type, info) => {
  const doShare = (to_app) => {
    window.browser && browser.app && browser.app.share && browser.app.share({
      title: info.title,
      description: info.desc,
      url: info.link,
      img_url: info.imgUrl,
      to_app
    });
  };
  switch (type) {
    case 'wx':
      doShare(8);
      break;
    case 'wxline':
      break;
    case 'qq':
      break;
    case 'qzone':
      break;
  }
};