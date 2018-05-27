/*
 * @Author: backtonature 
 * @Date: 2018-05-27 20:08:19 
 * @Last Modified by:   backtonature 
 * @Last Modified time: 2018-05-27 20:08:19 
 */
export default {
  showMask() {
    const $div = document.createElement('div');
    $div.className = 'm-share-mask';
    $div.style.cssText = `
    margin: 0;
    padding: 0;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.3);
    -webkit-transition: opacity .2s ease-in,z-index .2s ease-in;
    transition: opacity .2s ease-in,z-index .2s ease-in;
    `;
    document.body.appendChild($div);
  },
  showRightTopTips(text) {
    this.showMask();
    const $tips = document.createElement('div');
    $tips.className = 'm-share-tips';
    $tips.innerText = text;
    $tips.style.cssText = `
      font-size: 18px;
      color: #fff;
      position: fixed;
      z-index: 1001;
      top: 10px;
      right: 10px;
    `;
    document.body.appendChild($tips);
  }
  
};