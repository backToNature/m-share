/*
 * @Author: backtonature 
 * @Date: 2018-05-22 21:31:32 
 * @Last Modified by: backToNature
 * @Last Modified time: 2018-05-23 20:05:09
 */
import util from './util.js';
const qqJsSdkUrl = '//open.mobile.qq.com/sdk/qqapi.js?_bid=152';

const setShareInfo = (info) => {
  mqq.data.setShareInfo({
    share_url: info.link,
    title: info.title,
    desc: info.desc,
    image_url: info.imgUrl
  })
};

export default (info) => {
  if (window.mqq && mqq.data && mqq.data.setShareInfo) {
    setShareInfo(info);
  } else {
    util.loadScript(qqJsSdkUrl, () => {
      setShareInfo(info);
    });
  }
};
