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
  showActionSheet() {
    const $sheet = document.createElement('div');
    $sheet.id = 'm-share-actionSheet';
    $sheet.innerHTML = `
    <div class="m-share-flex">
      <i class="m-share-cell m-share-wx m-share-iconfont m-share-iconfont-wx"></i>
      <i class="m-share-cell m-share-wxline m-share-iconfont m-share-iconfont-wxline"></i>
      <i class="m-share-cell m-share-qq m-share-iconfont m-share-iconfont-qq"></i>
      <i class="m-share-cell m-share-qzone m-share-iconfont m-share-iconfont-qzone"></i>
      <i class="m-share-cell m-share-sina m-share-iconfont m-share-iconfont-sina"></i>
    </div>
    `;
    document.body.appendChild($sheet);
  },
  showMask() {
    const $div = document.createElement('div');
    $div.className = 'm-share-mask';
    document.body.appendChild($div);
    window.setTimeout(() => {
      $div.style.opacity = 0.7;
    }, 0);
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
    $tips.innerHTML = '请打开浏览器的菜单进行分享点击“<i class="m-share-iconfont m-share-iconfont-menu"></i>”或“<i class="m-share-iconfont m-share-iconfont-share"></i>”';
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
