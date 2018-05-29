/*
 * @Author: backtonature 
 * @Date: 2018-05-24 14:23:11 
 * @Last Modified by: daringuo
 * @Last Modified time: 2018-05-29 12:29:08
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
    qqBrowserShare('qq', info);
    return;
  }

  // 都不是则弹层二维码提示分享
  

};