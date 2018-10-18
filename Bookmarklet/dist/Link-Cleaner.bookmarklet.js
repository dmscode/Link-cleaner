javascript:(function(){const rulers={'www.bilibili.com':{testReg:/^http(?:s)?:\/\/www\.bilibili\.com\/video\/(av\d+).*$/i,replace:'https://www.bilibili.com/$1',query:['p'],hash:!0},'itunes.apple.com':{testReg:/^http(?:s)?:\/\/itunes\.apple\.com\/(?:\w{2}\/)?([^\/]+)\/(?:[^\/]+\/)?((?:id)\d+).*$/i,replace:'https://itunes.apple.com/cn/$1/$2',query:[],hash:!1},'chrome.google.com/webstore':{testReg:/^http(?:s)?:\/\/chrome\.google\.com\/webstore\/detail\/[^\/]+\/([a-z]{32}).*/i,replace:'https://chrome.google.com/webstore/detail/$1',query:[],hash:!1},'s.taobao.com':{testReg:/^http(?:s)?:\/\/s\.taobao\.com\/search.*$/i,replace:'https://s.taobao.com/search',query:['q'],hash:!1},'list.tmall.com':{testReg:/^http(?:s)?:\/\/list\.tmall\.com\/search_product\.htm.*$/i,replace:'https://list.tmall.com/search_product.htm',query:['q'],hash:!1},'item.taobao.com':{testReg:/^http(?:s)?:\/\/item\.taobao\.com\/item\.htm.*$/i,replace:'https://item.taobao.com/item.htm',query:['id'],hash:!1},'detail.tmall.com':{testReg:/^http(?:s)?:\/\/detail\.tmall\.com\/item\.htm.*$/i,replace:'https://detail.tmall.com/item.htm',query:['id'],hash:!1},'taobao/tmall.com/shop':{testReg:/^http(?:s)?:\/\/(\w+)\.(taobao|tmall)\.com\/shop\/view_shop\.htm.*$/i,replace:'https://$1.$2.com/',query:[],hash:!1},'item.m.jd.com':{testReg:/^http(?:s)?:\/\/item\.m\.jd\.com\/product\/(\d+)\.html(\?.*)?$/i,replace:'https://item.jd.com/$1.html',query:[],hash:!1},'weibo.com/u':{testReg:/^http(?:s)?:\/\/(?:www\.)?weibo\.com\/u\/(\d+)(\?.*)?$/i,replace:'https://m.weibo.cn/$1',query:[],hash:!1},'weibo.com':{testReg:/^http(?:s)?:\/\/(?:www\.)?weibo\.com\/(?:\d+)\/(\w+)(\?.*)?$/i,replace:'https://m.weibo.cn/status/$1',query:[],hash:!1},'greasyfork.org':{testReg:/^http(?:s)?:\/\/(?:www\.)?greasyfork\.org\/(?:[\w-]*\/)?scripts\/(\d+)-.*$/i,replace:'https://greasyfork.org/zh-CN/scripts/$1',query:[],hash:!1},'store.steampowered.com|steamcommunity.com':{testReg:/^http(?:s)?:\/\/(store\.steampowered|steamcommunity)\.com\/app\/(\d+).*$/i,replace:'https://$1.com/app/$2',query:[],hash:!1},'meta.appinn.com':{testReg:/^http(?:s)?:\/\/meta\.appinn\.com\/t(?:\/[^/]*[^/0-9][^/]*)*\/(\d+)(\/.*$|$)/i,replace:'https://meta.appinn.com/t/$1',query:[],hash:!1},'yangkeduo.com':{testReg:/^http(?:s)?:\/\/mobile\.yangkeduo\.com\/goods.html\?.*$/i,replace:'',query:['goods_id'],hash:!1},other:{testReg:/^(http(?:s)?:\/\/[^?#]*)[?#].*$/i,replace:'',query:['id','tid','uid','q','wd','query','keyword'],hash:!1}};const pureUrl=function(url=window.location.href){const hash=url.replace(/^[^#]*(#.*)?$/,'$1'),base=url.replace(/(\?|#).*$/,'');let pureUrl=url;function getQueryString(key){let ret=url.match(new RegExp('(?:\\?|&)'+key+'=([^?#&]*)','i'));return null===ret?'':ret[1]}for(let i in rulers){let ruler=rulers[i],reg=ruler.testReg,replace=ruler.replace;if(reg.test(url)){let querys=ruler.query,newQuerys='';if(querys.length)for(let query of querys)newQuerys+=''!==getQueryString(query)?(newQuerys.length?'&':'?')+query+'='+getQueryString(query):'';newQuerys+=ruler.hash?hash:'',pureUrl=(''===replace?base:base.replace(reg,replace))+newQuerys;break}}return pureUrl}();let newnode=document.createElement('input');newnode.id='pure-url-for-copy',newnode.value=pureUrl,document.body.appendChild(newnode);let copyinput=document.getElementById('pure-url-for-copy');copyinput.select();try{document.execCommand('copy');window.location.href===pureUrl?window.location.reload():window.location.href=pureUrl}catch(err){null!=prompt('净化后的网址是：',pureUrl)&&(window.location.href=pureUrl)}document.body.removeChild(copyinput)})();