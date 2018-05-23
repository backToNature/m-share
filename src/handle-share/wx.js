/*
 * @Author: backtonature 
 * @Date: 2018-05-23 21:20:45 
 * @Last Modified by: daringuo
 * @Last Modified time: 2018-05-23 21:44:05
 */
import util from '../util.js'

export default (info) => {
  if (util.ua.isFromWx) {
    // 微信客户端
    alert('右上角给出提示');
  }

  if (util.ua.isFromQQ) {
    // 手机qq
    alert('右上角给出提示');
  }

  if (util.ua.isFromUC) {
    // uc浏览器
    if (util.ua.isFromIos) {
      window.ucbrowser && window.ucbrowser.web_share(info.title, data.imgUrl, data.link, 'kWeixin', '', '', '');
    } else {
      window.ucweb && window.ucweb.startRequest("shell.page_share", [info.title, data.imgUrl, data.link, 'kWeixin', '', '']);
    }
  }

  if (util.ua.isFromQQBrower) {
    // qq浏览器
    
  }

};