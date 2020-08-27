// ==UserScript==
// @name 链接地址洗白白
// @namespace Daomouse Link Cleaner
// @version 0.1.4
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

/**
 * 链接净化规则
 * version 0.0.3
 * update 2020-08-27 12:10:04
 * 规则说明：
 * 
 */
const rules = {
  'www.bilibili.com': {/* Blibili */
    testReg: /^http(?:s)?:\/\/www\.bilibili\.com\/video\/(av\d+).*$/i,
    replace: 'https://www.bilibili.com/$1',
    query: ['p'],
    hash: true
  },
  'itunes.apple.com': {/* Apple Stroe */
    testReg: /^http(?:s)?:\/\/itunes\.apple\.com\/(?:\w{2}\/)?([^\/]+)\/(?:[^\/]+\/)?((?:id)\d+).*$/i,
    replace: 'https://itunes.apple.com/cn/$1/$2',
  },
  'apps.apple.com': {/* Apple Stroe */
    testReg: /^http(?:s)?:\/\/apps\.apple\.com\/(?:\w{2}\/)?([^\/]+)\/(?:[^\/]+\/)?((?:id)\d+).*$/i,
    replace: 'https://www.microsoft.com/store/apps/$1/$2',
  },
  'microsoft.com/win10-store': {/* Win10 apps store */
    testReg: /^http(?:s)?:\/\/www\.microsoft\.com\/[a-zA-Z-]{2,5}\/p\/(?:[\w-]+)\/([a-z0-9]{12,})(?:[^a-z0-9]|$)/i,
    replace: 'https://www.microsoft.com/store/apps/$1',
  },
  'chrome.google.com/webstore': {/* Chrome Store */
    testReg: /^http(?:s)?:\/\/chrome\.google\.com\/webstore\/detail\/[^\/]+\/([a-z]{32}).*/i,
    replace: 'https://chrome.google.com/webstore/detail/$1',
  },
  's.taobao.com': {/* Taobao Search */
    testReg: /^http(?:s)?:\/\/s\.taobao\.com\/search.*$/i,
    replace: 'https://s.taobao.com/search',
    query: ['q'],
  },
  'list.tmall.com': {/* Tmall Search */
    testReg: /^http(?:s)?:\/\/list\.tmall\.com\/search_product\.htm.*$/i,
    replace: 'https://list.tmall.com/search_product.htm',
    query: ['q'],
  },
  'item.taobao.com': {/* Taobao item */
    testReg: /^http(?:s)?:\/\/item\.taobao\.com\/item\.htm.*$/i,
    replace: 'https://item.taobao.com/item.htm',
    query: ['id'],
  },
  'detail.tmall.com': {/* Tmall item */
    testReg: /^http(?:s)?:\/\/detail\.tmall\.com\/item\.htm.*$/i,
    replace: 'https://detail.tmall.com/item.htm',
    query: ['id'],
  },
  'taobao/tmall.com/shop': {/* Taobao/Tmall Shop */
    testReg: /^http(?:s)?:\/\/(\w+)\.(taobao|tmall)\.com\/shop\/view_shop\.htm.*$/i,
    replace: 'https://$1.$2.com/',
  },
  'c.pc.qq.com': {/* Open Taobao share link from QQ */
    testReg: /^http(?:s)?:\/\/c\.pc\.qq\.com\/middle.html\?.*pfurl=([^&]*)(?:&.*$|$)/i,
    replace: '$1',
    query: [],
    methods: ['decodeUrl'],
  },
  'item.m.jd.com': {/* JD mobile to PC */
    testReg: /^http(?:s)?:\/\/item\.m\.jd\.com\/product\/(\d+)\.html(\?.*)?$/i,
    replace: 'https://item.jd.com/$1.html',
  },
  'item.m.jd.com/ware/': {/* JD mobile to PC */
    testReg: /^http(?:s)?:\/\/item\.m\.jd\.com\/ware\/view\.action\?.*wareId=(\d+).*$/i,
    replace: 'https://item.jd.com/$1.html',
  },
  'search.jd.com': {/* JD Search */
    testReg: /^http(?:s)?:\/\/search\.jd\.com\/Search\?.*$/i,
    query: ['keyword', 'enc'],
  },
  're.jd.com': {/* JD hot sell */
    testReg: /^http(?:s)?:\/\/re\.jd\.com\/cps\/item\/(\d+)\.html.*$/i,
    replace: 'https://item.jd.com/$1.html',
  },
  'weibo.com/u': {/* Weibo personal homepage to mobile */
    testReg: /^http(?:s)?:\/\/(?:www\.)?weibo\.com\/u\/(\d+)(\?.*)?$/i,
    replace: 'https://m.weibo.cn/$1',
  },
  'weibo.com': {/* Weibo article page to mobile */
    testReg: /^http(?:s)?:\/\/(?:www\.)?weibo\.com\/(?:\d+)\/(\w+)(\?.*)?$/i,
    replace: 'https://m.weibo.cn/status/$1',
  },
  'greasyfork.org/script': {/* Greasyfork Script 脚本页面 */
    testReg: /^http(?:s)?:\/\/(?:www\.)?greasyfork\.org\/(?:[\w-]*\/)?scripts\/(\d+)-[^//]*$/i,
    replace: 'https://greasyfork.org/scripts/$1',
  },
  'greasyfork.org/script/discussions': {/* Greasyfork Script 脚本评论页 */
    testReg: /^http(?:s)?:\/\/(?:www\.)?greasyfork\.org\/(?:[\w-]*\/)?scripts\/(\d+)-[^//]*\/discussions\/(\d+)$/i,
    replace: 'https://greasyfork.org/scripts/$1/discussions/$2',
    hash: true
  },
  'greasyfork.or/users': {/* Greasyfork Script 用户页面 */
    testReg: /^http(?:s)?:\/\/(?:www\.)?greasyfork\.org\/(?:[\w-]*\/)?users\/(\d+)-[^//]*$/i,
    replace: 'https://greasyfork.org/users/$1',
  },
  'store.steampowered.com|steamcommunity.com': {/* Steam */
    testReg: /^http(?:s)?:\/\/(store\.steampowered|steamcommunity)\.com\/app\/(\d+).*$/i,
    replace: 'https://$1.com/app/$2',
  },
  'meta.appinn.com': {/* Appinn BBS */
    testReg: /^http(?:s)?:\/\/meta\.appinn\.net\/t(?:\/[^/]*)*?\/(\d+)(\/.*$|$)/i,
    replace: 'https://meta.appinn.net/t/$1',
  },
  'amazon.co.jp': {/* amazon.co.jp */
    testReg: /^http(?:s)?:\/\/(?:www\.)?amazon\.co\.jp\/([^\/]+)\/dp\/(\w+)\/.*$/i,
    replace: 'https://www.amazon.co.jp/$1/dp/$2',
  },
  'yangkeduo.com': {/* Pin Duo Duo product Page */
    testReg: /^http(?:s)?:\/\/mobile\.yangkeduo\.com\/goods.html\?.*$/i,
    query: ['goods_id'],
  },
  'other': {/* All url */
    testReg: /^(http(?:s)?:\/\/[^?#]*)[?#].*$/i,
    query: ['id', 'tid', 'uid', 'q', 'wd', 'query', 'keyword'],
  }
}
function dms_get_pure_url (url=window.location.href) {
  const hash = url.replace(/^[^#]*(#.*)?$/, '$1')
  const base = url.replace(/(\?|#).*$/, '')
  let pureUrl = url
  const getQueryString = function(key) {
    let ret = url.match(new RegExp('(?:\\?|&)(' + key + '=[^?#&]*)', 'i'))
    return ret === null ? '' : ret[1]
  }
  /* 链接处理方法 */
  const methods = {
    decodeUrl: function(url){return decodeURIComponent(url) }
  }
  for(let i in rules){
    let rule = rules[i]
    let reg = rule.testReg
    let replace = rule.replace
    if (reg.test(url)){
      let newQuerys = ''
      if(typeof(rule.query)!=='undefined' && rule.query.length>0){
        rule.query.map((query) => {
          const ret = getQueryString(query)
          if(ret !== ''){
            newQuerys += (newQuerys.length ? '&' : '?') + ret
          }
        })
      }
      newQuerys += typeof(rule.hash)!=='undefined' && rule.hash
                   ? hash
                   : ''
      pureUrl = (typeof(replace)==='undefined'?base:url.replace(reg, replace) ) + newQuerys
      if(typeof(rule.methods)!=='undefined' && rule.methods.length>0){
        rule.methods.map((methodName)=>{
          pureUrl = methods[methodName](pureUrl)
        })
      }
      break
    }
  }
  return pureUrl
}
/** 必须函数 */
/* 弹出通知 */
const dmsCLNotification = function (text) {
  GM_notification(text, 'Success! by 链接地址洗白白', 'data:image/png;base64,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');
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
  #dms-link-cleaner {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 99999999;
  pointer-events: none;
}
#dms-link-cleaner * {
  pointer-events: auto;
}
#dms-lc-button {
  position: relative;
  margin: 0 auto;
  width: 24px;
  height: 12px;
  color: rgba(0, 0, 0, .3);
  font-size: 12px;
  line-height: 10px;
  cursor: pointer;
  text-align: center;
  border: 1px solid #AAA;
  border-radius: 12px 12px 0 0;
  background-color: rgba(255, 255, 255, .3);
  box-shadow: 0 0 5px rgba(0, 0, 0, .1);
}
#dms-lc-button:hover {
  color: rgba(0, 0, 0, .8);
  background-color: rgba(255, 255, 255, 0.8);
}
#dms-lc-panel {
  display: none;
  border-top: 5px solid #65adff;
  background-color: #FFF;
  box-shadow: 0 0 5px rgba(0, 0, 0, .1);
}
#dms-lc-panel > #dms-lc-panel-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 1 none;
  flex-wrap: wrap;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 16px 0;
  text-align: center;
  position: relative;
}
#dms-lc-panel > #dms-lc-panel-content > .dms-lc-button {
  position: relative;
  padding: 8px 16px;
  margin: 0 8px 0 0;
  font-size: 16px;
  line-height: 1.2em;
  font-weight: lighter;
  border: 1px solid #65adff;
  border-radius: 8px;
  cursor: pointer;
}
#dms-lc-panel > #dms-lc-panel-content > .dms-lc-button:hover {
  border: 1px solid #0062d1;
  background-color: #0062d1;
  color: #FFF;
  font-weight: normal;
}
#dms-lc-panel > #dms-lc-panel-content > .dms-lc-button:hover::before {
  content: attr(data-tip);
  background-color: rgba(0, 0, 0, .9);
  border-radius:3px;
  color: #fff;
  padding: 10px;
  position: absolute;
  width: calc(100% + 20px);
  left: 50%;
  bottom: calc(100% + 10px);
  margin-left: calc(-50% - 20px);
  white-space: pre;
}
#dms-lc-panel > #dms-lc-panel-content > .dms-lc-button:hover::after {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  left: calc(50% - 8px);
  top: -10px;
  border-top: 8px solid rgba(0, 0, 0, .8);
  border-right: 8px solid transparent;
  border-left: 8px solid transparent;
}
#dms-lc-panel > #dms-lc-panel-content > .dms-lc-hr {
  width: 100%;
  margin: 5px 0;
}
#dms-lc-panel > #dms-lc-panel-content > #dmsCLButtonCoffee {
  padding: 0;
  margin: 0;
}
#dms-lc-panel > #dms-lc-panel-content > #dmsCLButtonCoffee > svg {
  width: 35px;
  height: 35px;
}
#dms-lc-panel > #dms-lc-panel-content > #dms-lc-qrcode {
  display: none;
  width: 100%;

  position: absolute;
  left: 0;
  bottom: calc(100% + 24px);
  padding: 16px;
  color: #333;
  font-size: 18px;
  line-height: 1.2em;
  border: 1px solid #CCC;
  border-radius: 12px 12px 0 0;
  background-color: #FFF;
  box-shadow: 0 6px 36px 5px rgba(0, 0, 0, .16);
}
#dms-lc-panel > #dms-lc-panel-content > #dms-lc-qrcode > img {
  width: 30%;
  max-width: 180px;
}
  `);
  /** 添加界面 **/
  const dmsLCPopPanel = document.createElement('div');
  dmsLCPopPanel.id = 'dms-link-cleaner';
  dmsLCPopPanel.innerHTML = `<div id="dms-lc-button">
  ︽
</div>
<div id="dms-lc-panel">
  <div id="dms-lc-panel-content">
    <div class="dms-lc-button" id="dmsCLButtonTitle" data-tip="复制网页标题和净化后的链接">
      Copy pure link with title
    </div>
    <div class="dms-lc-button" id="dmsCLButtonPure" data-tip="复制净化后的链接">
      Copy pure link only
    </div>
    <div class="dms-lc-hr"></div>
    <div class="dms-lc-button" id="dmsCLButtonCopyTitle" data-tip="复制网页标题和当前网页链接">
      Copy current link with title
    </div>
    <div class="dms-lc-button" id="dmsCLButtonCopyLink" data-tip="复制当前网页链接">
      Copy current link only
    </div>
    <div class="dms-lc-hr"></div>
    <div class="dms-lc-button" id="dmsCLButtonCleanAll" data-tip="净化网页中所有链接">
      Clean all links in this page
    </div>
    <div class="dms-lc-button" id="dmsCLButtonLink" data-tip="联系作者">Issues</div>
    <div class="dms-lc-button" id="dmsCLButtonCoffee" data-tip="Coffee">
      <svg t="1539507279741" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1618" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M237.717333 320L277.333333 597.333333h469.333334l39.616-277.333333z" fill="#FFC107" p-id="1619"></path><path d="M832 320v-53.333333a32 32 0 0 0-32-32h-576A32 32 0 0 0 192 266.666667V320h640z" fill="#795548" p-id="1620"></path><path d="M280.384 618.666667L320 896h384l39.616-277.333333z" fill="#77574F" p-id="1621"></path><path d="M512 597.333333m-106.666667 0a106.666667 106.666667 0 1 0 213.333334 0 106.666667 106.666667 0 1 0-213.333334 0Z" fill="#77574F" p-id="1622"></path><path d="M426.666667 597.333333c0-15.616 4.501333-30.058667 11.84-42.666666h-167.253334l15.232 106.666666h169.621334A84.778667 84.778667 0 0 1 426.666667 597.333333zM585.493333 554.666667c7.338667 12.608 11.84 27.050667 11.84 42.666666a84.778667 84.778667 0 0 1-29.44 64h169.621334l15.232-106.666666h-167.253334zM768 128H256l-21.333333 106.666667h554.666666z" fill="#4E342E" p-id="1623"></path><path d="M512 448a149.333333 149.333333 0 1 1 0 298.666667 149.333333 149.333333 0 0 1 0-298.666667m0-21.333333c-94.101333 0-170.666667 76.565333-170.666667 170.666666s76.565333 170.666667 170.666667 170.666667 170.666667-76.565333 170.666667-170.666667-76.565333-170.666667-170.666667-170.666666z" fill="#5D4037" p-id="1624"></path><path d="M512 448a149.333333 149.333333 0 1 0 0 298.666667 149.333333 149.333333 0 0 0 0-298.666667z m0 234.666667a85.333333 85.333333 0 1 1 0-170.666667 85.333333 85.333333 0 0 1 0 170.666667z" fill="#FFF3E0" p-id="1625"></path></svg>
    </div>
    <div id="dms-lc-qrcode">
      Please Buy Me A Cup of Coffee.<br>
      链接地址洗白白，作者同学很可爱<br />
      扫码请杯热咖啡，规则更新更勤快
      <hr />
      <img src="images/AliPay-360.png" alt="Alipay">
      <img src="images/WePay-360.png" alt="Wechat">
      <img src="images/QQPay-360.png" alt="QQ">
    </div>
  </div>
</div>`;
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
