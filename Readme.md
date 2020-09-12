# 链接地址洗白白

## Greasemonkey（油猴子）版本：

[https://greasyfork.org/scripts/373270](https://greasyfork.org/scripts/373270)

## 小书签安装：

<a href="javascript:(function(){console.info('Version: 0.1.10');const rules={'www.bilibili.com':{testReg:/^http(?:s)?:\/\/www\.bilibili\.com\/video\/(av\d+).*$/i,replace:'https://www.bilibili.com/$1',query:['p'],hash:!0},'itunes.apple.com':{testReg:/^http(?:s)?:\/\/itunes\.apple\.com\/(?:\w{2}\/)?([^\/]+)\/(?:[^\/]+\/)?((?:id)\d+).*$/i,replace:'https://itunes.apple.com/cn/$1/$2'},'apps.apple.com':{testReg:/^http(?:s)?:\/\/apps\.apple\.com\/(?:\w{2}\/)?([^\/]+)\/(?:[^\/]+\/)?((?:id)\d+).*$/i,replace:'https://apps.apple.com/cn/$1/$2'},'microsoft.com/win10-store':{testReg:/^http(?:s)?:\/\/www\.microsoft\.com\/[a-zA-Z-]{2,5}\/p\/[^/]+\/([a-zA-Z0-9]{12,})(?:[^a-zA-Z0-9].*|$)/i,replace:'https://www.microsoft.com/store/apps/$1'},'chrome.google.com/webstore':{testReg:/^http(?:s)?:\/\/chrome\.google\.com\/webstore\/detail\/[^\/]+\/([a-z]{32}).*/i,replace:'https://chrome.google.com/webstore/detail/$1'},'s.taobao.com':{testReg:/^http(?:s)?:\/\/s\.taobao\.com\/search.*$/i,replace:'https://s.taobao.com/search',query:['q']},'list.tmall.com':{testReg:/^http(?:s)?:\/\/list\.tmall\.com\/search_product\.htm.*$/i,replace:'https://list.tmall.com/search_product.htm',query:['q']},'item.taobao.com':{testReg:/^http(?:s)?:\/\/item\.taobao\.com\/item\.htm.*$/i,replace:'https://item.taobao.com/item.htm',query:['id']},'detail.tmall.com':{testReg:/^http(?:s)?:\/\/detail\.tmall\.com\/item\.htm.*$/i,replace:'https://detail.tmall.com/item.htm',query:['id']},'taobao/tmall.com/shop':{testReg:/^http(?:s)?:\/\/(\w+)\.(taobao|tmall)\.com\/shop\/view_shop\.htm.*$/i,replace:'https://$1.$2.com/'},'c.pc.qq.com':{testReg:/^http(?:s)?:\/\/c\.pc\.qq\.com\/middle.html\?.*pfurl=([^&]*)(?:&.*$|$)/i,replace:'$1',query:[],methods:['decodeUrl']},'item.m.jd.com':{testReg:/^http(?:s)?:\/\/item\.m\.jd\.com\/product\/(\d+)\.html(\?.*)?$/i,replace:'https://item.jd.com/$1.html'},'item.m.jd.com/ware/':{testReg:/^http(?:s)?:\/\/item\.m\.jd\.com\/ware\/view\.action\?.*wareId=(\d+).*$/i,replace:'https://item.jd.com/$1.html'},'search.jd.com':{testReg:/^http(?:s)?:\/\/search\.jd\.com\/Search\?.*$/i,query:['keyword','enc']},'re.jd.com':{testReg:/^http(?:s)?:\/\/re\.jd\.com\/cps\/item\/(\d+)\.html.*$/i,replace:'https://item.jd.com/$1.html'},'weibo.com/u':{testReg:/^http(?:s)?:\/\/(?:www\.)?weibo\.com\/u\/(\d+)(\?.*)?$/i,replace:'https://m.weibo.cn/$1'},'weibo.com':{testReg:/^http(?:s)?:\/\/(?:www\.)?weibo\.com\/(?:\d+)\/(\w+)(\?.*)?$/i,replace:'https://m.weibo.cn/status/$1'},'greasyfork.org/script/tabs':{testReg:/^http(?:s)?:\/\/(?:www\.)?greasyfork\.org\/(?:[\w-]*\/)?scripts\/(\d+)-[^//]*\/(code|versions|stats|derivatives|admin).*$/i,replace:'https://greasyfork.org/scripts/$1/$2',hash:!0},'greasyfork.org':{testReg:/^http(?:s)?:\/\/(?:www\.)?greasyfork\.org\/(?:[\w-]*\/)?(scripts|users)\/(\d+)-[^//]*$/i,replace:'https://greasyfork.org/$1/$2'},'greasyfork.org/scripts/list':{testReg:/^http(?:s)?:\/\/(?:www\.)?greasyfork\.org\/(?:[\w-]*\/)?scripts\?.*$/i,query:['set','page']},'greasyfork.org/script/discussions':{testReg:/^http(?:s)?:\/\/(?:www\.)?greasyfork\.org\/(?:[\w-]*\/)?scripts\/(\d+)-[^//]*\/discussions\/(\d+).*$/i,replace:'https://greasyfork.org/scripts/$1/discussions/$2',hash:!0},'greasyfork.org/discussions':{testReg:/^http(?:s)?:\/\/(?:www\.)?greasyfork\.org\/(?:[\w-]*\/)?discussions\/(greasyfork|development|requests)\/(\d+)(?:[^\d].*)?$/i,replace:'https://greasyfork.org/discussions/$1/$2',hash:!0},'store.steampowered.com|steamcommunity.com':{testReg:/^http(?:s)?:\/\/(store\.steampowered|steamcommunity)\.com\/app\/(\d+).*$/i,replace:'https://$1.com/app/$2'},'meta.appinn.com':{testReg:/^http(?:s)?:\/\/meta\.appinn\.net\/t(?:\/[^/]*)*?\/(\d+)(\/.*$|$)/i,replace:'https://meta.appinn.net/t/$1'},'amazon.co.jp':{testReg:/^http(?:s)?:\/\/(?:www\.)?amazon\.co\.jp\/([^\/]+)\/dp\/(\w+)\/.*$/i,replace:'https://www.amazon.co.jp/$1/dp/$2'},'yangkeduo.com':{testReg:/^http(?:s)?:\/\/mobile\.yangkeduo\.com\/goods.html\?.*$/i,query:['goods_id']},'trello.com':{testReg:/^http(?:s)?:\/\/(?:www\.)?trello\.com\/(\w)\/(\w+)(\/.*$|$)/i,replace:'https://trello.com/$1/$2',hash:!0},other:{testReg:/^(http(?:s)?:\/\/[^?#]*)[?#].*$/i,query:['id','tid','uid','q','wd','query','keyword']}};const pureUrl=function(url=window.location.href){const hash=url.replace(/^[^#]*(#.*)?$/,'$1'),base=url.replace(/(\?|#).*$/,'');let pureUrl=url;const getQueryString=function(key){let ret=url.match(new RegExp('(?:\\?|&)('+key+'=[^?#&]*)','i'));return null===ret?'':ret[1]},methods={decodeUrl:function(url){return decodeURIComponent(url)}};for(let i in rules){let rule=rules[i],reg=rule.testReg,replace=rule.replace;if(reg.test(url)){let newQuerys='';void 0!==rule.query&&rule.query.length>0&&rule.query.map(query=>{const ret=getQueryString(query);''!==ret&&(newQuerys+=(newQuerys.length?'&':'?')+ret)}),newQuerys+=void 0!==rule.hash&&rule.hash?hash:'',pureUrl=(void 0===replace?base:url.replace(reg,replace))+newQuerys,void 0!==rule.methods&&rule.methods.length>0&&rule.methods.map(methodName=>{pureUrl=methods[methodName](pureUrl)});break}}return pureUrl}();let newnode=document.createElement('input');newnode.id='pure-url-for-copy',newnode.value=pureUrl,document.body.appendChild(newnode);let copyinput=document.getElementById('pure-url-for-copy');copyinput.select();try{document.execCommand('copy');window.location.href===pureUrl?window.location.reload():window.location.href=pureUrl}catch(err){null!=prompt('净化后的网址是：',pureUrl)&&(window.location.href=pureUrl)}document.body.removeChild(copyinput)})();">链接地址洗白白</a>

（将上方链接拖拽到书签栏即可，如上方不是链接，则先点击 **下面链接**）

## 更新地址：

[https://dmscode.github.io/Link-cleaner/](https://dmscode.github.io/Link-cleaner/)

## 这是什么：

这是一个小书签（Bookmarklet），把 js 文件的内容当做网址保存为书签，在需要的时候点击一下这个书签，就可以将当前网页的网址净化（去除不必要的 get 参数）。

默认情况会自动将净化后的网址保存当剪切板，并将当前页面转向至净化后的网址，以便验证可用性。当写入剪切板失败的时候会弹出提示框，可以自行复制网址，确认后网页自动跳转进行验证。

## 已有规则：

- 淘宝商品页
- 天猫商品页
- 淘宝店铺首页
- 天猫店铺首页
- 尝试对淘宝客户端分享到 QQ 的链接进行跳转（beta）
- 京东移动端商品页转 PC 端
- 京东搜索结果列表
- 谷歌搜索结果（只保留搜索关键词，不含过滤器）
- 必应搜索结果（只保留搜索关键词，不含过滤器）
- 百度搜索结果（只保留搜索关键词，不含过滤器）
- Apple itunes 应用商店（返回中文页面网址）
- Chrome 扩展商店
- Greasyfork 脚本页面
- Bilibili 视频页面
- 微博个人主页及单条微博页面（会强转为清爽的 HTML5 版）
- Steam 商店和创意工坊列表
- 小众软件论坛
- 日亚
- 拼多多
- 其他较规范的网址

如果遇到常见网站未被支持，请告知作者，谢谢。

其他未列出网址也可尝试，万一可以用呢？

## 更新日期：

![](https://img.shields.io/badge/Version-0.1.11-blue?style=for-the-badge) **2020-9-12 15:35:33**

## 请我喝杯咖啡吧

如果觉得这个小书签对你有帮助，能不能扫描二维码，请我喝一杯咖啡？

![请我喝杯咖啡吧~](./Greasemonkey/images/AliPay-360.png)
![请我喝杯咖啡吧~](./Greasemonkey/images/WePay-360.png)
![请我喝杯咖啡吧~](./Greasemonkey/images/QQPay-360.png)
