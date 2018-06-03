/*
 * @Author: backToNature 
 * @Date: 2018-05-22 17:23:35 
 * @Last Modified by: backToNature
 * @Last Modified time: 2018-05-30 17:39:03
 */
import util from './util.js';
import ui from './ui.js';
import setNormalShareInfo from './set-normal-share-info.js';
import setQQshareInfo from './set-qq-share-info.js';

let isInit = false;

export default (config) => {
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