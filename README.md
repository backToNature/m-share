# m-share

移动端分享组件，一键分享微博、QQ空间、QQ好友、微信

 \- |微信客户端 | 手q | qq浏览器 | uc浏览器 | 其他浏览器
 -- | -- | -- | --| -- | --
 分享到微信 | 提示点击右上角分享 | 提示点击右上角分享 | native分享 | native分享 | 弹层提示
 分享到朋友圈 | 提示点击右上角分享 | 提示点击右上角分享 | native分享 | native分享 | 弹层提示
 分享到qq | 提示点击右上角分享 | 提示点击右上角分享 | native分享 | - | 弹层提示
 分享到qq空间 | 提示点击右上角分享 | 提示点击右上角分享 | native分享 | web分享 | web分享
 分享到新浪微博 | web分享 | web分享 | web分享 | web分享 | web分享


## 安装

有两种安装方式

1. npm安装

	npm install m-share

2. script引入

	<script src="m-share.js"></script>

## 基本使用

	<div class="m-share"></div>
	<script src="./m-share"></script>
	<script>
	  var config = {
	    title: '', // 标题，默认读取document.title
	    desc: '', // 描述, 默认读取head标签：<meta name="description" content="desc" />
	    link: '', // 网址，默认使用window.location.href
	    imgUrl: '', // 图片, 默认取网页中第一个img标签
	    types: ['wx', 'wxline', 'qq', 'qzone', 'sina'], // 开启的分享图标, 默认为全部
	    wx: { // 如果需要配置微信客户端分享的内容，需要填入如下参数
	      appId: '', // 公众号的唯一标识
	      timestamp: , // 生成签名的时间戳
	      nonceStr: '', // 生成签名的随机串
	      signature: '', // 签名
	    }
	  };
	  Mshare.init(config);
	</script>


## 进阶配置

```config```中的参数都可以通过attribute```data-${param}```来覆盖

### 修改分享标题

	<div class="m-share" data-title="修改后的标题"></div>

### 指定分享渠道

	<div class="m-share" data-types="wx,qq"></div>

### 各渠道的标题不同

	<div class="m-share">
	  <div class="m-share-wx" data-title="分享到微信"></div>
	  <div class="m-share-wxline" data-title="分享到微信朋友圈"></div>
	  <div class="m-share-qq" data-title="分享到微信qq好友"></div>
	</div>

### 指定dom渲染

	<div class="myClass"></div>
	<script>
	  var config = {...};
	  // Mshare.render('.myClass', config); // 传入selector
	  Mshare.render(document.querySelector('.myClass', config));
	</script>
