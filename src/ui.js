/*
 * @Author: backtonature 
 * @Date: 2018-05-27 20:08:19 
 * @Last Modified by: daringuo
 * @Last Modified time: 2018-05-30 21:05:38
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
  showActionSheet(dom) {
    this.showMask();
    const $sheet = document.createElement('div');
    $sheet.id = 'm-share-actionSheet';
    $sheet.appendChild(dom);
    document.body.appendChild($sheet);
    window.setTimeout(() => {
      $sheet.style.cssText = '-webkit-transform: translateY(0);transform: translateY(0);';
    }, 0);
  },
  hideActionSheet() {
    const dom = document.querySelector('#m-share-actionSheet');
    if (dom) {
      // 渐变消失
      // dom.addEventListener('webkitTransitionend', () => {
      //   dom.remove();
      // });
      // dom.addEventListener('transitionend', () => {
      //   dom.remove();
      // });
      // dom.style.cssText = '-webkit-transform: translateY(100%);transform: translateY(100%);';
      dom.remove();
    }
  },
  showMask() {
    if (document.querySelector('.m-share-mask')) {
      return;
    }
    const $div = document.createElement('div');
    $div.className = 'm-share-mask';
    $div.addEventListener('click', () => {
      this.hideActionSheet();
      this.hideBottomTips();
      this.hideRightTips();
      this.hideMask();
    });
    document.body.appendChild($div);
    window.setTimeout(() => {
      $div.style.opacity = 0.7;
    }, 0);
  },
  hideMask() {
    const domList = document.querySelectorAll('.m-share-mask');
    for (let i = 0; i < domList.length; i++) {
      const item = domList[i];
      const removeDom = () => item.remove();
      // 渐变消失
      // item.addEventListener('webkitTransitionend', removeDom);
      // item.addEventListener('transitionend', removeDom);
      // item.style.cssText = 'opacity: 0';
      removeDom();
    }
  },
  showBottomTips() {
    this.showMask();
    const $tips = document.createElement('div');
    $tips.className = 'm-share-tips-bottom';
    $tips.innerHTML = '请打开浏览器的菜单进行分享点击“<i class="m-share-iconfont m-share-iconfont-menu"></i>”或“<i class="m-share-iconfont m-share-iconfont-share"></i>”';
    document.body.appendChild($tips);
    window.setTimeout(() => {
      this.hideMask();
      this.hideBottomTips();
    }, 1400);
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
    $tips.innerHTML = `
      <div class="m-share-tips-w">
        <div class="m-share-tips-p">点击右上角“<i class="m-share-iconfont m-share-iconfont-dots"></i>”</div>
        <div class="m-share-tips-p">分享给朋友吧！</div>
      </div>
      <div class="m-share-tips-arrow"></div>
    `;
    document.body.appendChild($tips);
    window.setTimeout(() => {
      this.hideMask();
      this.hideRightTips();
    }, 1400);
  },
  hideRightTips() {
    const domList = document.querySelectorAll('.m-share-tips');
    for (let i = 0; i < domList.length; i++) {
      const item = domList[i];
      item.remove();
    }
  }
};
