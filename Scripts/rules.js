/**
 * 链接净化规则
 * version 0.0.1
 * update 2018-10-18 11:52:26
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
    query: [],
    hash: false
  },
  'chrome.google.com/webstore': {/* Chrome Store */
    testReg: /^http(?:s)?:\/\/chrome\.google\.com\/webstore\/detail\/[^\/]+\/([a-z]{32}).*/i,
    replace: 'https://chrome.google.com/webstore/detail/$1',
    query: [],
    hash: false
  },
  's.taobao.com': {/* Taobao Search */
    testReg: /^http(?:s)?:\/\/s\.taobao\.com\/search.*$/i,
    replace: 'https://s.taobao.com/search',
    query: ['q'],
    hash: false,
  },
  'list.tmall.com': {/* Tmall Search */
    testReg: /^http(?:s)?:\/\/list\.tmall\.com\/search_product\.htm.*$/i,
    replace: 'https://list.tmall.com/search_product.htm',
    query: ['q'],
    hash: false,
  },
  'item.taobao.com': {/* Taobao item */
    testReg: /^http(?:s)?:\/\/item\.taobao\.com\/item\.htm.*$/i,
    replace: 'https://item.taobao.com/item.htm',
    query: ['id'],
    hash: false,
  },
  'detail.tmall.com': {/* Tmall item */
    testReg: /^http(?:s)?:\/\/detail\.tmall\.com\/item\.htm.*$/i,
    replace: 'https://detail.tmall.com/item.htm',
    query: ['id'],
    hash: false,
  },
  'taobao/tmall.com/shop': {/* Taobao/Tmall Shop */
    testReg: /^http(?:s)?:\/\/(\w+)\.(taobao|tmall)\.com\/shop\/view_shop\.htm.*$/i,
    replace: 'https://$1.$2.com/',
    query: [],
    hash: false,
  },
  'item.m.jd.com': {/* JD mobile to PC */
    testReg: /^http(?:s)?:\/\/item\.m\.jd\.com\/product\/(\d+)\.html(\?.*)?$/i,
    replace: 'https://item.jd.com/$1.html',
    query: [],
    hash: false,
  },
  'search.jd.com': {/* JD Search */
    testReg: /^http(?:s)?:\/\/search\.jd\.com\/Search\?.*$/i,
    replace: '',
    query: [],
    hash: false,
  },
  'weibo.com/u': {/* Weibo personal homepage to mobile */
    testReg: /^http(?:s)?:\/\/(?:www\.)?weibo\.com\/u\/(\d+)(\?.*)?$/i,
    replace: 'https://m.weibo.cn/$1',
    query: ['keyword', 'enc'],
    hash: false,
  },
  'weibo.com': {/* Weibo article page to mobile */
    testReg: /^http(?:s)?:\/\/(?:www\.)?weibo\.com\/(?:\d+)\/(\w+)(\?.*)?$/i,
    replace: 'https://m.weibo.cn/status/$1',
    query: [],
    hash: false,
  },
  'greasyfork.org': {/* Greasyfork Script */
    testReg: /^http(?:s)?:\/\/(?:www\.)?greasyfork\.org\/(?:[\w-]*\/)?scripts\/(\d+)-.*$/i,
    replace: 'https://greasyfork.org/zh-CN/scripts/$1',
    query: [],
    hash: false,
  },
  'store.steampowered.com|steamcommunity.com': {/* Steam */
    testReg: /^http(?:s)?:\/\/(store\.steampowered|steamcommunity)\.com\/app\/(\d+).*$/i,
    replace: 'https://$1.com/app/$2',
    query: [],
    hash: false,
  },
  'meta.appinn.com': {/* Appinn BBS */
    testReg: /^http(?:s)?:\/\/meta\.appinn\.com\/t(?:\/[^/]*[^/0-9][^/]*)*\/(\d+)(\/.*$|$)/i,
    replace: 'https://meta.appinn.com/t/$1',
    query: [],
    hash: false,
  },
  'yangkeduo.com': {/* Pin Duo Duo product Page */
    testReg: /^http(?:s)?:\/\/mobile\.yangkeduo\.com\/goods.html\?.*$/i,
    replace: '',
    query: ['goods_id'],
    hash: false,
  },
  'other': {/* All url */
    testReg: /^(http(?:s)?:\/\/[^?#]*)[?#].*$/i,
    replace: '',
    query: ['id', 'tid', 'uid', 'q', 'wd', 'query', 'keyword'],
    hash: false,
  }
}