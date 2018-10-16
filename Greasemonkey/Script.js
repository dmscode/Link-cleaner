// ==UserScript==
// @name 链接地址洗白白
// @namespace Daomouse Link Cleaner
// @version 0.0.5
// @author 稻米鼠
// @description 把链接地址缩减至最短可用状态，并复制到剪切板，以方便分享。【在每个页面的底部中间，有一个小小的按钮，用来呼出面板】
// @homepage https://dmscode.github.io/Link-cleaner/
// @updateURL 
// @downloadURL 
// @supportURL https://meta.appinn.com/t/7363
// @match *://*/*
// @grant GM_setClipboard
// @grant GM_notification
// @noframes
// ==/UserScript==

/** 添加界面 **/
const dmsLCPopPanel = document.createElement('div')
dmsLCPopPanel.id = 'dms-link-cleaner'
dmsLCPopPanel.innerHTML = ``
document.body.insertBefore(dmsLCPopPanel, document.body.lastChild.nextSibling)

/** 主功能函数 **/

main.js

/** 事件响应函数 **/

/* 定义元素 */
const button = document.getElementById('dms-lc-button')
const panel = document.getElementById('dms-lc-panel')
const qrcode = document.getElementById('dms-lc-qrcode')
const buttonTitle = document.getElementById('dmsCLButtonTitle')
const buttonPure = document.getElementById('dmsCLButtonPure')
const buttonLink = document.getElementById('dmsCLButtonLink')
const buttonCoffee = document.getElementById('dmsCLButtonCoffee')

/**
 * 面板切换
 */
const dmsLCToggleEl = function(el){
  const elStyle = getComputedStyle(el, '')
  if(elStyle.display === 'none'){
    el.style.display = 'block'
  }else{
    el.style.display = ''
  }
}
/**
 * 弹出通知
 */
const dmsCLNotification = function(text){
  GM_notification(text, '链接地址洗白白', 'data:image/png;base64,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')
}

/** 添加监听器 **/
/* 面板切换按钮 */
button.addEventListener("click", () =>{ dmsLCToggleEl(panel) }, false)
/* 二维码切换按钮 */
buttonCoffee.addEventListener("click", () =>{ dmsLCToggleEl(qrcode) }, false)
/* 支持链接 */
buttonLink.addEventListener("click", () =>{ window.open('https://meta.appinn.com/t/7363', '_blank'); }, false)
/* 复制标题和链接 */
buttonTitle.addEventListener("click", () =>{
  const pureUrl = dms_get_pure_url()
  const ttileAndUrl = document.title +' '+ pureUrl
  GM_setClipboard(ttileAndUrl)
  dmsCLNotification('网站标题 & 链接地址已复制到剪切板中~')
  window.location.href = pureUrl
}, false)
/* 只复制链接 */
buttonPure.addEventListener("click", () =>{
  const pureUrl = dms_get_pure_url()
  GM_setClipboard(pureUrl)
  dmsCLNotification('链接地址已复制到剪切板中~')
  window.location.href = pureUrl
}, false)