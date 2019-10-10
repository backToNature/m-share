/*
 * @Author: backtonature 
 * @Date: 2018-05-24 14:17:21 
 * @Last Modified by: backtonature
 * @Last Modified time: 2018-06-01 15:05:57
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

  if (util.ua.isFromUC) {
    // uc浏览器
    ui.hideMask();
    if (util.ua.isFromIos) {
      window.ucbrowser && window.ucbrowser.web_share(info.title, info.desc, info.link, 'kWeixinFriend', info.imgUrl, '', '');
    } else {
      window.ucweb && window.ucweb.startRequest("shell.page_share", [info.title, info.desc, info.link, 'WechatTimeline', info.imgUrl, '']);
    }
    return;
  }

  if (util.ua.isFromQQBrower) {
    // qq浏览器
    ui.hideMask();
    qqBrowserShare('wxline', info);
    return;
  }

  ui.showBottomTips();
};