// ==UserScript==
// @name 链接地址洗白白
// @namespace Daomouse Link Cleaner
// @version ```version```
// @author 稻米鼠
// @description 把链接地址缩减至最短可用状态，并复制到剪切板，以方便分享。【在每个页面的底部中间，有一个小小的按钮，用来呼出面板】
// @icon https://i.v2ex.co/vpQpSrfgl.png
// @homepage https://script.izyx.xyz/clean-the-link/
// @updateURL
// @downloadURL
// @supportURL https://meta.appinn.com/t/7363
// @match *://*/*
// @grant GM_setClipboard
// @grant GM_notification
// @grant GM_addStyle
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_registerMenuCommand
// @noframes
// ==/UserScript==

/**
 * 声明：本页面代码未作任何压缩处理
 * 但不意味着作者允许任何形式的——
 * 借用、抄袭、修改……
 * 未经作者允许，仅有权使用，及分享
 * 且分享必须在鲜明位置给出本脚本在
 * Greasemonkey 中的发布地址
 * 作者未授权任何其他网站提供下载！
 * 开源不等于任君自取，自重！！！
 */

/** 主功能函数 **/

```scripts_rules_js```
```scripts_main_js```
/** 必须函数 */
/* 弹出通知 */
const dmsCLNotification = function (text) {
  GM_notification(text, 'Success! by 链接地址洗白白', '```logo```');
};
/* 打开支持页面 */
const goToSupport = () => {
  window.open('https://meta.appinn.com/t/7363', '_blank');
};
/* 复制净化后的链接和标题 */
const getCleanUrlAndTitle = () => {
  const pureUrl = dms_get_pure_url();
  const ttileAndUrl = document.title + ' \n' + pureUrl;
  GM_setClipboard(ttileAndUrl);
  dmsCLNotification('链接地址已净化，并和网站标题一起复制到剪切板中~');
  if(window.location.href !== pureUrl) window.location.href = pureUrl;
};
/* 复制净化后的链接 */
const getCleanUrl = () => {
  const pureUrl = dms_get_pure_url();
  GM_setClipboard(pureUrl);
  dmsCLNotification('链接地址已净化并复制到剪切板中~');
  if(window.location.href !== pureUrl) window.location.href = pureUrl;
};
/* 直接复制页面链接和标题 */
const getUrlAndTitle = () => {
  const theUrl = document.title + ' \n' + window.location.href;
  GM_setClipboard(theUrl);
  dmsCLNotification('网站标题 & 链接地址已复制到剪切板中~');
  dmsLCToggleEl(panel);
};
/* 复制当前页面链接 */
const getUrlOnly = () => {
  const theUrl = window.location.href;
  GM_setClipboard(theUrl);
  dmsCLNotification('链接地址已复制到剪切板中~');
  dmsLCToggleEl(panel);
};
/* 清理整个页面 */
const cleanAllPage = () => {
  const aTagEles = document.getElementsByTagName('a');
  for (let i = 0; i < aTagEles.length; i++) {
    let theLink = aTagEles[i].href;
    if (theLink.match(/^(http:\/\/|https:\/\/|\/\/)/) !== null) {
      theLink = theLink.replace(/^\/\//, 'https://');
      aTagEles[i].href = dms_get_pure_url(theLink);
    }
  }
  panel.style.display = '';
  dmsCLNotification(
    '页面中所有链接已净化~\n可能导致部分链接无法使用，刷新后恢复。'
  );
  dmsLCToggleEl(panel);
};
/** 获取是否显示页面工具栏 **/
let isShowPageBar = GM_getValue('SHow_page_bar', true);

/* 注册菜单项 */
GM_registerMenuCommand('复制【净化】链接和标题', getCleanUrlAndTitle);
GM_registerMenuCommand('复制【净化】链接', getCleanUrl);
GM_registerMenuCommand('【净化】所有链接', cleanAllPage);
GM_registerMenuCommand('复制【当前】链接和标题', getUrlAndTitle);
GM_registerMenuCommand('复制【当前】链接', getUrlOnly);
GM_registerMenuCommand('显示/隐藏页面工具条', () => {
  GM_setValue('SHow_page_bar', !isShowPageBar);
  isShowPageBar = GM_getValue('SHow_page_bar', true);
  alert(
    '页面工具条已被设置为【' +
      (isShowPageBar ? '显示' : '隐藏') +
      '】，仅在此后新打开页面中生效。'
  );
});
GM_registerMenuCommand('支持 & 反馈', goToSupport);

if (isShowPageBar) {
  /** 添加样式 **/
  GM_addStyle(`
  ```greasymonkey_style```
  `);
  /** 添加界面 **/
  const dmsLCPopPanel = document.createElement('div');
  dmsLCPopPanel.id = 'dms-link-cleaner';
  dmsLCPopPanel.innerHTML = ````greasymonkey_DOM````;
  document.body.insertBefore(
    dmsLCPopPanel,
    document.body.lastChild.nextSibling
  );

  /** 事件响应函数 **/

  /* 定义元素 */
  const button = document.getElementById('dms-lc-button');
  const panel = document.getElementById('dms-lc-panel');

  const qrcode = document.getElementById('dms-lc-qrcode');

  const buttonTitle = document.getElementById('dmsCLButtonTitle');
  const buttonPure = document.getElementById('dmsCLButtonPure');

  const buttonCopyT = document.getElementById('dmsCLButtonCopyTitle');
  const buttonCopyL = document.getElementById('dmsCLButtonCopyLink');

  const buttonCleanLink = document.getElementById('dmsCLButtonCleanAll');

  const buttonLink = document.getElementById('dmsCLButtonLink');
  const buttonCoffee = document.getElementById('dmsCLButtonCoffee');

  /**
   * 面板切换
   */
  const dmsLCToggleEl = function (el) {
    const elStyle = getComputedStyle(el, '');
    if (elStyle.display === 'none') {
      el.style.display = 'block';
    } else {
      el.style.display = '';
    }
  };

  /** 添加监听器 **/
  /* 面板切换按钮 */
  button.addEventListener(
    'click',
    () => {
      dmsLCToggleEl(panel);
    },
    false
  );
  /* 二维码切换按钮 */
  buttonCoffee.addEventListener(
    'click',
    () => {
      dmsLCToggleEl(qrcode);
    },
    false
  );
  /* 支持链接 */
  buttonLink.addEventListener('click', goToSupport, false);
  /* 净化并复制标题和链接 */
  buttonTitle.addEventListener('click', getCleanUrlAndTitle, false);
  /* 净化并复制链接 */
  buttonPure.addEventListener('click', getCleanUrl, false);
  /* 复制当前链接和标题 */
  buttonCopyT.addEventListener('click', getUrlAndTitle, false);
  /* 复制当前链接 */
  buttonCopyL.addEventListener('click', getUrlOnly, false);
  /* 清理整个页面 */
  buttonCleanLink.addEventListener('click', cleanAllPage, false);
  /* 全屏隐藏按钮 */
  document.addEventListener('fullscreenchange', function (event) {
    if (document.fullscreenElement) {
      button.style.display = 'none';
    } else {
      button.style.display = '';
    }
  });
}
