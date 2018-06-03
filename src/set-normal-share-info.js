/*
 * @Author: backToNature 
 * @Date: 2018-05-30 12:54:24 
 * @Last Modified by: backToNature
 * @Last Modified time: 2018-05-30 13:39:38
 */
export default (info) => {
  if (info.desc && !document.querySelector('meta[name$="cription"]')) {
    const $meta = document.createElement('meta');
    $meta.setAttribute('description', info.desc);
  }
  // 添加隐藏的img标签在body最前面
  if (info.imgUrl) {
    const $img = document.createElement('img');
    $img.style.cssText = 'width: 0;height: 0;position: absolute;z-index: -9999;top: -99999px;left: -99999px;';
    $img.onload = () => {
      document.body.insertBefore($img, document.body.firstChild);
    };
    $img.onerror = () => {
      $img.remove();
    };
    $img.src = info.imgUrl;
  }
};
