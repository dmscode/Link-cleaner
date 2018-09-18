链接地址洗白白
===

这是一个小书签（Bookmarklet），把 js 文件的内容当做网址保存为书签，在需要的时候点击一下这个书签，就可以将当前网页的网址净化（去除不必要的 get 参数）。

默认情况会自动将净化后的网址保存当剪切板，并将当前页面转向至净化后的网址，以便验证可用性。当写入剪切板失败的时候会弹出提示框，可以自行复制网址，确认后网页自动跳转进行验证。

目前支持但不仅限于如下网站：

* 淘宝商品页
* 天猫商品页
* 淘宝店铺首页
* 天猫店铺首页
* 京东移动端商品页转 PC 端
* 谷歌搜索结果（只保留搜索关键词，不含过滤器）
* 必应搜索结果（只保留搜索关键词，不含过滤器）
* 百度搜索结果（只保留搜索关键词，不含过滤器）
* Apple itunes 应用商店（返回中文页面网址）
* Chrome 扩展商店
* Greasyfork 脚本页面
* Bilibili 视频页面
* 微博个人主页及单条微博页面（会强转为清爽的 HTML5 版）
* Steam 商店和创意工坊列表
* 小众软件论坛

其他未列出网址也可尝试，万一可以用呢？

如果遇到常见网站未被支持，请告知作者，谢谢。

小书签安装：<a href="javascript: (function () { const rulers = { 'tools.appinn.com': {/* 小众工具站，保留 hash */ testReg: /^http(s)?:\/\/tools\.appinn\.com\/.*$/i, replace: '', query: [], hash: true }, 'www.bilibili.com': {/* Blibili */ testReg: /^http(?:s)?:\/\/www\.bilibili\.com\/video\/(av\d+).*$/i, replace: 'https://www.bilibili.com/$1', query: ['p'], hash: true }, 'itunes.apple.com': {/* Apple Stroe */ testReg: /^http(?:s)?:\/\/itunes\.apple\.com\/(?:\w{2}\/)?([^\/]+)\/(?:[^\/]+\/)?((?:id)\d+).*$/i, replace: 'https://itunes.apple.com/cn/$1/$2', query: [], hash: false }, 'chrome.google.com/webstore': {/* Chrome Store */ testReg: /^http(?:s)?:\/\/chrome\.google\.com\/webstore\/detail\/[^\/]+\/([a-z]{32}).*/i, replace: 'https://chrome.google.com/webstore/detail/$1', query: [], hash: false }, 's.taobao.com': {/* Taobao Search */ testReg: /^http(?:s)?:\/\/s\.taobao\.com\/search.*$/i, replace: 'https://s.taobao.com/search', query: ['q'], hash: false, }, 'list.tmall.com': {/* Tmall Search */ testReg: /^http(?:s)?:\/\/list\.tmall\.com\/search_product\.htm.*$/i, replace: 'https://list.tmall.com/search_product.htm', query: ['q'], hash: false, }, 'item.taobao.com': {/* Taobao item */ testReg: /^http(?:s)?:\/\/item\.taobao\.com\/item\.htm.*$/i, replace: 'https://item.taobao.com/item.htm', query: ['id'], hash: false, }, 'detail.tmall.com': {/* Tmall item */ testReg: /^http(?:s)?:\/\/detail\.tmall\.com\/item\.htm.*$/i, replace: 'https://detail.tmall.com/item.htm', query: ['id'], hash: false, }, 'taobao/tmall.com/shop': {/* Taobao/Tmall Shop */ testReg: /^http(?:s)?:\/\/(\w+)\.(taobao|tmall)\.com\/shop\/view_shop\.htm.*$/i, replace: 'https://$1.$2.com/', query: [], hash: false, }, 'item.m.jd.com': {/* JD mobile to PC */ testReg: /^http(?:s)?:\/\/item\.m\.jd\.com\/product\/(\d+)\.html(\?.*)?$/i, replace: 'https://item.jd.com/$1.html', query: [], hash: false, }, 'weibo.com/u': {/* Weibo personal homepage to mobile */ testReg: /^http(?:s)?:\/\/(?:www\.)weibo\.com\/u\/(\d+)(\?.*)?$/i, replace: 'https://m.weibo.cn/$1', query: [], hash: false, }, 'weibo.com': {/* Weibo article page to mobile */ testReg: /^http(?:s)?:\/\/(?:www\.)weibo\.com\/(?:\d+)\/(\w+)(\?.*)?$/i, replace: 'https://m.weibo.cn/status/$1', query: [], hash: false, }, 'greasyfork.org': {/* Greasyfork Script */ testReg: /^http(?:s)?:\/\/(?:www\.)?greasyfork\.org\/(?:[\w-]*\/)?scripts\/(\d+)-.*$/i, replace: 'https://greasyfork.org/zh-CN/scripts/$1', query: [], hash: false, }, 'store.steampowered.com|steamcommunity.com': {/* Steam */ testReg: /^http(?:s)?:\/\/(store\.steampowered|steamcommunity)\.com\/app\/(\d+).*$/i, replace: 'https://$1.com/app/$2', query: [], hash: false, }, 'meta.appinn.com': {/* Appinn BBS */ testReg: /^http(?:s)?:\/\/meta\.appinn\.com\/t\/(?:[^\/]*\/)*?(\d+).*$/i, replace: 'https://meta.appinn.com/t/$1', query: [], hash: false, }, 'other': {/* All url */ testReg: /^(http(?:s)?:\/\/[^?#]*)[?#].*$/i, replace: '', query: ['id', 'tid', 'uid', 'q', 'wd', 'query'], hash: false, }, }; const url = window.location.href; const hash = window.location.hash; const base = window.location.href.replace(/(\?|#).*$/, ''); let pureUrl = url; function getQueryString(key) { let ret = window.location.search.match(new RegExp('(?:\\?|&)' + key + '=(.*?)(?:&|$|#)', 'i')); return ret === null ? '' : ret[1]; } for(let i in rulers){ let ruler = rulers[i]; let reg = ruler.testReg; let replace = ruler.replace; if (reg.test(url)){ let querys = ruler.query; let newQuerys = ''; if(ruler.query.length){ for(let j in querys){ newQuerys += getQueryString(querys[j]) !== '' ? (newQuerys.length?'&':'?')+querys[j]+'='+getQueryString(querys[j]) : ''; } } newQuerys += ruler.hash ? window.location.hash : ''; pureUrl = (replace===''?base:base.replace(reg, replace) ) + newQuerys; break; } } let newnode = document.createElement('input'); newnode.id = 'pure-url-for-copy'; newnode.value = pureUrl; document.body.appendChild(newnode); let copyinput = document.getElementById('pure-url-for-copy'); copyinput.select(); try { let copyresult = document.execCommand('copy'); if(window.location.href === pureUrl){ window.location.reload(); }else{ window.location.href = pureUrl; } }catch (err) { let reload = prompt('净化后的网址是：',pureUrl); if (reload != null){ window.location.href = pureUrl; } } document.body.removeChild(copyinput); })();">链接地址洗白白</a>（更新日期：2018年9月18日）

（将上方链接拖拽到书签栏即可，如上方不是链接，则先点击 **下面**）

小书签固定更新页：[https://dmscode.github.io/Link-cleaner/](https://dmscode.github.io/Link-cleaner/)