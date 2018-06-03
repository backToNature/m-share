/*
 * @Author: backtonature 
 * @Date: 2018-05-24 14:23:11 
 * @Last Modified by: backtonature
 * @Last Modified time: 2018-06-01 15:05:26
 */

import util from '../util.js';
import qqBrowserShare from './handle-qqbrowser.js';
import ui from '../ui.js';

export default (info) => {
  if (util.ua.isFromWx) {
    // 微信客户端
    ui.showRightTopTips();
    return;
  }

  if (util.ua.isFromQQ) {
    // 手机qq
    ui.showRightTopTips();
    return;
  }

  if (util.ua.isFromQQBrower) {
    // qq浏览器
    ui.hideMask();
    qqBrowserShare('qzone', info);
    return;
  }
  const query = `url=${encodeURIComponent(info.link)}&title=${encodeURIComponent(info.title)}&desc=${encodeURIComponent(info.desc)}&summary=${encodeURIComponent(info.desc)}&site=${encodeURIComponent(info.link)}`
  location.href = `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?${query}`;
};