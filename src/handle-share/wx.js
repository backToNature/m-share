/*
 * @Author: backtonature 
 * @Date: 2018-05-23 21:20:45 
 * @Last Modified by: daringuo
 * @Last Modified time: 2018-05-24 14:21:03
 */
import util from '../util.js';
import qqBrowserShare from './handle-qqbrowser.js';
import ui from '../ui.js';

export default (info) => {
  // if (util.ua.isFromWx) {
  if (true) {
    ui.showRightTopTips('点击右上角分享给微信好友');
    // 微信客户端
    // alert('右上角给出提示');
    return;
  }

  if (util.ua.isFromQQ) {
    // 手机qq
    alert('右上角给出提示');
    return;
  }

  if (util.ua.isFromUC) {
    // uc浏览器
    if (util.ua.isFromIos) {
      window.ucbrowser && window.ucbrowser.web_share(info.title, data.imgUrl, data.link, 'kWeixin', '', '', '');
    } else {
      window.ucweb && window.ucweb.startRequest("shell.page_share", [info.title, data.imgUrl, data.link, 'WechatFriends', '', '']);
    }
    return;
  }

  if (util.ua.isFromQQBrower) {
    // qq浏览器
    qqBrowserShare('wx', info);
    return;
  }

  // 都不是则弹层二维码提示分享
  

};