// ==UserScript==
// @name 链接地址洗白白
// @namespace Daomouse Link Cleaner
// @version 0.0.8
// @author 稻米鼠
// @description 把链接地址缩减至最短可用状态，并复制到剪切板，以方便分享。【在每个页面的底部中间，有一个小小的按钮，用来呼出面板】
// @icon https://i.v2ex.co/eva0t1TJ.png
// @homepage https://dmscode.github.io/Link-cleaner/
// @updateURL 
// @downloadURL 
// @supportURL https://meta.appinn.com/t/7363
// @match *://*/*
// @grant GM_setClipboard
// @grant GM_notification
// @grant GM_addStyle
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

/** 添加样式 **/
GM_addStyle(`
{{{Greasemonkey/Style.css}}}
`)
/** 添加界面 **/
const dmsLCPopPanel = document.createElement('div')
dmsLCPopPanel.id = 'dms-link-cleaner'
dmsLCPopPanel.innerHTML = `{{{Greasemonkey/DOM.html}}}`
document.body.insertBefore(dmsLCPopPanel, document.body.lastChild.nextSibling)

/** 主功能函数 **/

{{{Scripts/rules.js}}}
{{{Scripts/main.js}}}

/** 事件响应函数 **/

/* 定义元素 */
const button = document.getElementById('dms-lc-button')
const panel = document.getElementById('dms-lc-panel')
const qrcode = document.getElementById('dms-lc-qrcode')
const buttonTitle = document.getElementById('dmsCLButtonTitle')
const buttonPure = document.getElementById('dmsCLButtonPure')
const buttonLink = document.getElementById('dmsCLButtonLink')
const buttonCleanLink = document.getElementById('dmsCLButtonCleanAll')
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
  GM_notification(text, '链接地址洗白白', '{{{logo.png}}}')
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
  const ttileAndUrl = document.title +' \n'+ pureUrl
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
/* 清理整个页面 */
buttonCleanLink.addEventListener("click", () =>{
  const aTagEles = document.getElementsByTagName('a')
  for(let i=0; i<aTagEles.length; i++){
    let theLink = aTagEles[i].href
    if(theLink.match(/^(http:\/\/|https:\/\/|\/\/)/) !== null){
      theLink = theLink.replace(/^\/\//, 'https://')
      aTagEles[i].href = dms_get_pure_url(theLink)
    }
  }
  panel.style.display = ''
  dmsCLNotification('页面中所有链接已净化~\n可能导致部分链接无法使用，刷新后恢复。')
}, false)