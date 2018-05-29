/*
 * @Author: backtonature 
 * @Date: 2018-05-27 20:08:19 
 * @Last Modified by: daringuo
 * @Last Modified time: 2018-05-29 17:24:54
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
    const domList = document.querySelectorAll('.m-share-mask');
    for (let i = 0; i < domList.length; i++) {
      const item = domList[i];
      item.remove();
    }
  },
  showBottomTips(tips) {
    this.showMask();
    const $tips = document.createElement('div');
    $tips.className = 'm-share-tips-bottom';
    $tips.innerHTML = '<p>请打开浏览器的菜单进行分享</p><p>菜单一般为<i class="m-share-iconfont m-share-iconfont-menu"></i>图标</p><p>ios为<i class="m-share-iconfont m-share-iconfont-share"></i>图标</p>';
    document.body.appendChild($tips);
    window.setTimeout(() => {
      this.hideMask();
      this.hideBottomTips();
    }, 2000);
  },
  hideBottomTips() {
    const domList = document.querySelectorAll('.m-share-tips-bottom');
    for (let i = 0; i < domList.length; i++) {
      const item = domList[i];
      item.remove();
    }
  },
  showRightTopTips() {
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
    const domList = document.querySelectorAll('.m-share-tips');
    for (let i = 0; i < domList.length; i++) {
      const item = domList[i];
      item.remove();
    }
  }
};
