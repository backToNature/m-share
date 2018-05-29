/*
 * @Author: backtonature 
 * @Date: 2018-05-27 20:08:19 
 * @Last Modified by: daringuo
 * @Last Modified time: 2018-05-29 11:36:59
 */
import util from './util.js';
import style from './style.js';

let isStyleLoaded = false;
export default {
  initStyle() {
    if (!isStyleLoaded) {
      util.execStyle(style.cssText);
      isStyleLoaded = true;
    }
  },
  showMask() {
    const $div = document.createElement('div');
    $div.className = 'm-share-mask';
    document.body.appendChild($div);
  },
  hideMask() {
    document.querySelectorAll('.m-share-mask').forEach(item => {
      item.remove();
    });
  },
  showRightTopTips(text) {
    this.showMask();
    const $tips = document.createElement('div');
    $tips.className = 'm-share-tips';
    document.body.appendChild($tips);
    window.setTimeout(() => {
      this.hideMask();
      this.hideRightTips();
    }, 2000);
  },
  hideRightTips() {
    document.querySelectorAll('.m-share-tips').forEach(item => {
      item.remove();
    });
  }
};
