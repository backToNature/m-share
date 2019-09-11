/*
 * @Author: backtonature 
 * @Date: 2018-05-23 21:20:45 
 * @Last Modified by: backtonature
 * @Last Modified time: 2018-06-01 15:07:06
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
    ui.hideMask();
    if (util.ua.isFromIos) {
      window.ucbrowser && window.ucbrowser.web_share(info.title, info.desc, info.link, 'kWeixin', info.imgUrl, '', '');
    } else {
      window.ucweb && window.ucweb.startRequest("shell.page_share", [info.title, info.desc, info.link, 'WechatFriends', info.imgUrl, '']);
    }
    return;
  }

  if (util.ua.isFromQQBrower) {
    // qq浏览器
    ui.hideMask();
    qqBrowserShare('wx', info);
    return;
  }

  ui.showBottomTips();
};