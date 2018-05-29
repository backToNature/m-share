/*
 * @Author: backtonature 
 * @Date: 2018-05-23 21:20:45 
 * @Last Modified by: daringuo
 * @Last Modified time: 2018-05-29 14:25:55
 */
import util from '../util.js';
import qqBrowserShare from './handle-qqbrowser.js';
import ui from '../ui.js';

export default (info) => {
  if (util.ua.isFromWx) {
    ui.showRightTopTips();
    return;
  }

  if (util.ua.isFromQQ) {
    ui.showRightTopTips();
    return;
  }
  if (util.ua.isFromUC) {
    // uc浏览器
    if (util.ua.isFromIos) {
      window.ucbrowser && window.ucbrowser.web_share(info.title, info.imgUrl, info.link, 'kWeixin', '', '', '');
    } else {
      window.ucweb && window.ucweb.startRequest("shell.page_share", [info.title, info.imgUrl, info.link, 'WechatFriends', '', '']);
    }
    return;
  }

  if (util.ua.isFromQQBrower) {
    // qq浏览器
    qqBrowserShare('wx', info);
    return;
  }

  ui.showBottomTips();

  // 都不是则弹层二维码提示分享
  

};