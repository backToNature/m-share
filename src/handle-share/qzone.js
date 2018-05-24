/*
 * @Author: backtonature 
 * @Date: 2018-05-24 14:23:11 
 * @Last Modified by: daringuoture
 * @Last Modified time: 2018-05-24 14:24:41
 */

import util from '../util.js';
import qqBrowserShare from './handle-qqbrowser.js';

export default (info) => {
  if (util.ua.isFromWx) {
    // 微信客户端
    alert('右上角给出提示');
    return;
  }

  if (util.ua.isFromQQ) {
    // 手机qq
    alert('右上角给出提示');
    return;
  }

  if (util.ua.isFromQQBrower) {
    // qq浏览器
    qqBrowserShare('qzone', info);
    return;
  }

  // 都不是则弹层二维码提示分享
  

};