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
    replace: 'https://apps.apple.com/cn/$1/$2',
  },
  'microsoft.com/win10-store': {/* Win10 apps store */
    testReg: /^http(?:s)?:\/\/www\.microsoft\.com\/[a-zA-Z-]{2,5}\/p\/[\w-]+\/([a-z0-9]{12,})(?:[^a-z0-9].*|$)/i,
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
  'greasyfork.org/script/discussions': {/* Greasyfork Script 脚本下讨论 */
    testReg: /^http(?:s)?:\/\/(?:www\.)?greasyfork\.org\/(?:[\w-]*\/)?scripts\/(\d+)-[^//]*\/discussions\/(\d+).*$/i,
    replace: 'https://greasyfork.org/scripts/$1/discussions/$2',
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
  'other': {/* All url */
    testReg: /^(http(?:s)?:\/\/[^?#]*)[?#].*$/i,
    query: ['id', 'tid', 'uid', 'q', 'wd', 'query', 'keyword'],
  }
}