// ==UserScript==
// @name 链接地址洗白白
// @namespace Daomouse Link Cleaner
// @version 0.1.12
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
 * version 0.0.5
 * update 2020-09-01 07:07:37
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
    replace: 'https://apps.apple.com/cn/$1/$2',
  },
  'microsoft.com/win10-store': {/* Win10 apps store */
    testReg: /^http(?:s)?:\/\/www\.microsoft\.com\/[a-zA-Z-]{2,5}\/p\/[^/]+\/([a-zA-Z0-9]{12,})(?:[^a-zA-Z0-9].*|$)/i,
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
  'greasyfork.org/script/tabs': {/* Greasyfork Script 脚本下各种标签 */
    testReg: /^http(?:s)?:\/\/(?:www\.)?greasyfork\.org\/(?:[\w-]*\/)?scripts\/(\d+)-[^//]*\/(code|versions|stats|derivatives|admin).*$/i,
    replace: 'https://greasyfork.org/scripts/$1/$2',
    hash: true
  },
  'greasyfork.org': {/* Greasyfork Script 各类页面 */
    testReg: /^http(?:s)?:\/\/(?:www\.)?greasyfork\.org\/(?:[\w-]*\/)?(scripts|users)\/(\d+)-[^//]*$/i,
    replace: 'https://greasyfork.org/$1/$2',
  },
  'greasyfork.org/scripts/list': {/* Greasyfork Script 脚本列表 */
    testReg: /^http(?:s)?:\/\/(?:www\.)?greasyfork\.org\/(?:[\w-]*\/)?scripts\?.*$/i,
    query: ['set', 'page']
  },
  'greasyfork.org/script/discussions': {/* Greasyfork Script 脚本下讨论 */
    testReg: /^http(?:s)?:\/\/(?:www\.)?greasyfork\.org\/(?:[\w-]*\/)?scripts\/(\d+)-[^//]*\/discussions\/(\d+).*$/i,
    replace: 'https://greasyfork.org/scripts/$1/discussions/$2',
    hash: true
  },
  'greasyfork.org/discussions': {/* Greasyfork Script 论坛 */
    testReg: /^http(?:s)?:\/\/(?:www\.)?greasyfork\.org\/(?:[\w-]*\/)?discussions\/(greasyfork|development|requests)\/(\d+)(?:[^\d].*)?$/i,
    replace: 'https://greasyfork.org/discussions/$1/$2',
    hash: true
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
  'trello.com': {/* trello.com */
    testReg: /^http(?:s)?:\/\/(?:www\.)?trello\.com\/(\w)\/(\w+)(\/.*$|$)/i,
    replace: 'https://trello.com/$1/$2',
    hash: true,
  },
  'other': {/* All url */
    testReg: /^(http(?:s)?:\/\/[^?#]*)[?#].*$/i,
    query: ['id', 'tid', 'uid', 'q', 'wd', 'query', 'keyword', 'keywords'],
  }
}
/**
 * 主功能代码
 * version 0.0.1
 * update 2020-09-01 07:07:37
 */
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
  GM_notification(text, 'Success! by 链接地址洗白白', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAASyElEQVR4nO2de3AU1Z7HPz0BhgQkkSAQEcjdiQFCEpHERVBQ8QUL3ETAm1VKRMAqSgX1upZYVFklWqzCKpalVQq4sNaFIsCGxEfcAXM1AiFeIIEbDA+ZK4JcA4JGYqIBkt4/ThomSfdMv2Z6ZsynKn8k3X36wPc7Z87jd35HkmWZGCQBGND2MxC4BugD9Gr76QG4gJ5t9/8GtAIXgMa2n/PAD0AdcLrtpyls/4IwIcWAARKBNMADDEEIflWI3tWAMMQJwAccA34O0bvCQjQaoBuQDowEMhGCO0kdcBD4CjgKXHK2OsaIFgPEAcOBXGAUoomPRJqA/cBe4DDQ4mx1ghPpBrgGuAUYCyQ5XBej1AO7gV2IvkREEqkGGAbcjWjiJYfrYhUZ8RWxHTjicF06EWkGyAamAkOdrkiI+Bb4CPi70xVRiBQDZAB5QKrD9QgXx4ESoNbhejhugP7An4AsJyvhIAeBQuCMUxVwygDdEU39XYhh3e+ZS8CniK+Gi+F+uRMGSAceQnz6u7jCGeAvhLmjGE4DdAPuA+4k+nv2oUIGyoCthGlCKVwGSAHmA9eF42UxwHfAGuD7UL8oHAbIBWYD7lC/KMZoBt5HzCqGDNMGkKTArbgsyy5Ek383v6Mmv6ysrG9ZWdmAurq6+HPnzsW73e6Wfv36/erxeBruv//+fw4ZMuQ3A8XJiAmkrZIktQa80ayOoTCALMtu4BHgRlOFRxGPPPJIzhdffGF44srtdl9avHjx3tmzZ/9Tx+37gf+WJKlZ64aIMYAsy1cBTxDDkzperzf58ccfnyDLsi0tW1pa2tlPPvnkC5fLFei248BbkiQ1qF2MCAPIspwEPIXo9MUc5eXlV8+dO/eOUJXfp0+f36qrq0sD3PI98IYkSfUdLzhuAFmWk4E/A/1MFRjh5OTkTK6vr48Px7uefPLJqkWLFh3XuHwWeF2SpHP+f3TUALIsX40QP+Ymd/bv3997xowZ94T7vUFagx+A1yRJ+kn5g2MGaPvOf4YYbPaff/75EZs2bRrhZB1qa2uL3W632gigDvgvpU/giAFkWe6B+OT/wVQhEUxBQcGYvXv3DnK6HgCfffZZqcbw8RvE18GFsBsAEVW7ALjBbAGRSn5+/riamhqnYw3bUVVV9UFiYqLa9PAB4B1EVLNhAo47gjCDLvHDxujRo/+ocekGhBamMGuAHMSiTkwRqeIrpKWl5WtcuhOhiWHMGCAFeJgYm96NdPFBTK9PmTJlvMolCaGJ4Y64UQN0Q6zqxdTCTjSIr3D48OFrjh8/3lPlkhuhjaEAG6OdwPsRUTwxQ15e3i0HDx4cYHe5kyZN8iUmJl4A8Pl8feweUfh8viKNS2XAJr3lGHFLOjH2vW+3+K+99trO/Pz8gPF9b7311tCVK1ea+r72Z/Xq1YMfffTRkyqXJiJGBroii/S2AN2BF4ihmT47xV+6dGnlrFmz9KzqXea99967btmyZf9q5b0BWoEzwFJ0xBjqNcB04F79VYts7BQ/gAi68Hg8080+W1hY+Glubu55jcteIGjd9HQCBxBD3/v5+fnj7BK/pqam2GoZPp+vSJIkU7Nx8+bNuzXA5bsQ2gVEjwFmIjZnRj15eXm32NXb9/l8RQkJCaZm3zpy7NixrWae++WXX9RGAwpxiE57QIIZYARiu1bUY+MnX7ba7KtRWFj4qZnnamtrewW4nIXQUJNgBsgzXKMIxK5xflxcXIvP5zP1aQ1Gbm7u+fj4+AtGn1u+fPnwILdozR4CgQ2QTQys8tnV7MfHx184evRoiR110sLr9W43+syOHTuCxSOmEqAVD2SAaUYrE2nY1dvv37//LwcPHvzIjjoFYtCgQZpBn4HYvHlzMINraqllgHREvp2oxS7x09LSzu3evXubHXXSQ0pKitawTpPKyspgYXhDEJp2QssAdxutRCRhV4cvNzf3lNfrLbejTnoZO3as4d1A586dCzQaUFDVVM0A/Yji7dp2dfhmzpx5uLCw8Es76mSErKysn4Lf1Z4ff/xRz+JcFioBu2oGuJUoXep94YUXhtkh/jPPPLP31VdfdSR5Q/fu3Q1PCsXHx+vZSCoBnZaSOy4GuRBJmaKO7du3912/fv1Iq+W8/vrrO/Py8hxL2HDo0KE+Rp9JTk7Wu91sHCIzyeUJrI4GyEBk1Iw6FixYcLvVMjZu3PjpTTfdZLgTZic7duy41ugz6enpeuvcB6HxQeUPHQ1geZnSCawsqCiUlZWVpqamGtm4GRJOnDhxtdFnpk2bVmfg9hz8DODfB+iGSMIYVaxYseJfrJZRVVX1QSSIf+rUKcORVkOGDPnJ4/H8auCRUfh98P1bgHQiNwOnJu+8844l04ZiXt8s9957r+Hh9/z5842mlElAaF0L7VsAyx2ocPPYY49ZCkvvKH5TU5Pr448/dmRvY0VFReKvv/7aw+hzRgNR2ristX8LkGmiIEfxer0eM89JktR67Nixdmv5TU1NrqysLGXh5IspU6actVxBAzz00EPhDLfLBDbDlRYgCeezbhti48aNZusrBxGfRYsWTQhnS+DxeO4z89ycOXNqTL5yIG25l5WQsJsQIcVRw/XXX5/f2tpqeF+DWrPvL74/b775ZshbgvT09LyWlhZTATcW+y9rgD3Kf2DULfuaEX/NmjWf+f8eSHwIfUtgRfzs7GwjQz81/gBXvgKiygCHDh0yNVq54447Ls+zBxNfIVQm8Hg8082KD7B169YKi1VIBWEACTA8++QkK1euHGb0mS1btlwOttArvoLdJrA6cXXnnXd+Y0M1BgGSC0jmyuFJUcG+ffsMdwBvvPHGBjAuvsKiRYsm7Ny50/KhFXbMWq5ataraahkIzZNdRGFmD6O5enr27HkRzIuv8PDDD088c+aM4bG6gh3i79q1y87IpBSlBYhpcnJyvgdzS60dGTt27FQzz9kh/ty5c/8+cOBAw4GjAUj+XRjg2muvbQJhgLahkyUjjBo16t+M3J+enm45unrChAnfLlmy5JjVcjoQOQbIz88fl5+fPy4UZTc1NbVb9fT5fFu7detm+kSvhoaGnhUVFYl67rXa2wfIzMw8vXbt2n1WytCgnwvoHYKCDaGEcdXU1AwMhQmOHTvWSawjR46U9OnTx/QKoJ6pWzs++VlZWXUlJSW7rJajQS8XoTtlUxcdY/hCYYIjR45co/b36urq0sGDB3fKuqmX999/X3P4bNcnv7i42Op4PxBXOdoCaAVwhqolUOPzzz//68033/ydmWdffPHFm9X+bkeHLzMz83QIP/kKvVyIvf9hJ1j0biATmJkGXb169WCta+vXr//b6NGjzSyr0tzc3G5KOorEB+jhwlqqOFPoDd3WMsHMmTOPG33nK6+8clOg65s3b640WibA3Llzc/1/z8zMPG2mHP/nwyQ+gMtFmBM+GY3bVzOBySAInnvuuYxA1zds2GB4h25lZWW7Y3BKSkp2mTVBmMUHcIf1029204ZdfYItW7YMP3nypKbhx4wZY0tEsBkTOCA+IJp/UxsSjWJ1l25NTc3AgoKCMcrvkyZNMjUpcvvtt08JdH3BggX7jZa5bdu2TnMpRkzglPhAswuTOWaNYNdGTf+tWm+//bbp83cDddSeffbZfxgtz+v1qhpbjwkcFB+g1UWIT6u0Q/y2xAydol969+5tuvXyeDzTO/bgzVJVVaWZPa2kpGRXVlaW6qglxJM8erjgAn4JVel27NKNi4tr0UrMUF5e7rVSdkZGRr6GCQytFQTbzFFcXFzR0QRZWVl1IZ7k0UOjC1A9hMgqduzSDSQ+QFJS0qXExEQjmyI6oWaClJQU2/9P/E0QIeIDNISkBZg9e3ZuqMVXqKqq+sTKe0CYwP/37t27h6RfVFxcXFFQUHAoQsSHthbgXNDbDPDuu+8O2bVrl6XsInrFV3jggQcsb+X27xOcPHlS10qfGZYtW3YoVGWb4KytBjh69GjC8uXLc4PfGbQcQ8mYXn755cNJSUmWvgrgSktg13mAUcA5Ww0wefLkSVbLMBvrvm/fvk/MZtxUMJv5s3fv3o5vLDXJORc2nVBtNEqmI1pDPSOYzbgJQvyEhITWhQsXGk6MOXr0aEvz/w7yvdICWHJwRUVFYkNDg+nIYqPf+YEwE/KliA9QWlqaZvSdt956azQa4DfaWgAZMLW4omBlY6Od4iv4fL6tbrdbT96cduJPnz7d1HrDvHnzTMUTOMwpQFbGv6Y3Gmzfvr2v2WdDIb5CbW3tB3379m0MdI+/+JWVlYkHDhyIqg2yFjkOV2IBTBvASm6eUKde3bNnjzctLU21k+svfmNjY9ysWbNMtWKpqamG07pFCN/AFQN8baaE1lbz8yXhyszh9XrLJ06c2M7g/uI3NTW5srOzTQdvrlu3LlImdYzyNVwxQD3iLFpDzJ8/f7SZN4c7Lcvq1aurFy5cWAWdxbeyUwhg8ODBYVlOt5k6hObtwsEOqt+rTXl5earRZ2bNmvWV0Wfs4Kmnnjruf8iDHeI//fTToYjVDweqWcLCIszSpUuNJjWyHTvEB3jiiSe+taM+DnBZa38DHAWa9JZQX19v6IBCgPHjx58w+ozd2CV+aWnp/9lRHwdoQmgNtDfAJcR5c7rYtGmT4V3F69at22v0GTuxS/zU1NSfhg0bpvvDEmEcQGgNdA4J1y3Q7t27o+oMQbvEBygrK/ss+F0RSzuNOxqgFtAVGdvY2OjIhhIz2Cl+JCWWNMF5oN1ydEcDtAK6xrXRYoAu8dtRAbTbFa0WD7cDHYsp8fHxIQ0mtYMu8dshAzs7/lHNAGfRMSfQt2/fiF4D7xK/E18BP3T8o1ZYdNBDkoYOHWo4lrCpqSksO5G6xFdFNYJaS5CjQMAxu8Ec9QAsWLDA1NSxEbrEV+UEfmN/fwJ9IksDlZidnW24BbAaLBqMLvE10dQykAH2AyftrslLL710vd1lQpf4ATiJ0FKVQAaQCXL+vJlNGevWrcu6ePGirVG3XeIHZCsBRnXBOmW1gGZK8iVLllSZqdHw4cNNpUdXo0v8gNQQZJFPT698Mx0mDxRmzJhhOhjSjgxa9fX13brE16QF2BLsJj0GOA1oZs4wGxLV0tIS5/F4pjc0NJjKpFVUVNQ/Jyfnj2ae7UgMig9Cs6AjNeXAiGB0B14AVBeArCZGGjNmzHcbNmz4m977MzIypjU3N9syFR2j4p8BlqJj67/eiZmLwF/Q6EwEi74Nxpdffnmdx+OZPnny5Alq2TYAVq1aNXjkyJFT2/bwdYmvjYzQStdUvd4WQOFPgGr0rB3p0cJJjIoPUAZs0nuz0anZIkB1E0THyNtIJobF/w4x7NON0RYAxPkCz6OSXs7sQU7hJIbFbwb+E4N7Pc2I9T3wP6j0B77++mtTu2vDRQyLD/A+Jjb6mv207kN813S+sG/fBybLDCkxLv6nGAjn88dKc/2/qASRJiUlXdq2bZvltC12EuPiH0BoYQozfQDxoCQhy3IP4M+oHDtXX1/fza6JGivEuPjfAK9LknTBtI5WDAAgy/JVwH+gcfSsk8PDGBf/NLBCkqQGALM6Wu6xt1XgDVTCjUCIkJaWFtaDmEeMGHEmxsU/C6xUxLeC5RZAQZblfsDTgOoBi7W1tb2mTZt2r6mXGeDDDz/0ZmRkWJqZjHAU8dt9qBxrARTaKrQCjQWIjIyMRp/PV1RQUBCSNGkPPvhgrc/nK4px8esQzb5tLaptLYBCW5/gCdrOptWiqKio/+LFi8e1tLSYNqHb7b74xhtvVNxzzz225jqMUI4Db2k1+451AjUq4wbmAqP0lOX1epPXrl2btmfPnkGB7nO73Rdvu+22k3PmzPmHXbn9o4QDwHuSJGnmIogoAwDIsuwC7gPuMVLu2rVrr6uuru579uzZnj///HOP5OTk31JSUprGjx//w9SpU1U7mjHONmCrJEkB07GE3QAGyAVmE+ajaWKAZsT0bkh3VIfDACCOp5+POLK8i+CcAtZgMX2fHsJlABBRRfcBE4HfSy5eo8jAXxFLumHZexlOAygMB2ahEV72O+YMsB44HM6XOmEAEK3BVOAuwHCqmRjjEmJl9UPC9Kn3xykDKPQH/h0Y6WQlHOQroBAxr+8IThtAIQPII8jkUQxxHChBbLxxlEgxgEI24qthqNMVCRHfAh8hduxExH98pBlAYRhwN5BJ9I8YZETCje2A4zkSOxKpBlC4BhgP3AyE7ByfEHEe2I1IuROxM5iRbgCFOGAEYlbxBiDB2epo0oSYt9+LyMaluqcykogWA/jTDUhHjBwy0YhECiN1iCb+K0QWDl0HVUQK0WiAjiQBnrafIQhDXBWidzUgBD8B+Np+6kP0rrAQCwZQIwEYgDDDAERfog/QG+iFmIjqBvRou/8C4pN7EWhEHKZ5HvHdfRoh+mkM5FKOFv4f4BVr5irhOlwAAAAASUVORK5CYII=');
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
      <img src="data:image/png;base64,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" alt="Alipay">
      <img src="data:image/png;base64,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" alt="Wechat">
      <img src="data:image/png;base64,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" alt="QQ">
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
