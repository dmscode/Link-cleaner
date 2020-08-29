javascript:(function(){console.info('Version: 0.1.9');const rules={'www.bilibili.com':{testReg:/^http(?:s)?:\/\/www\.bilibili\.com\/video\/(av\d+).*$/i,replace:'https://www.bilibili.com/$1',query:['p'],hash:!0},'itunes.apple.com':{testReg:/^http(?:s)?:\/\/itunes\.apple\.com\/(?:\w{2}\/)?([^\/]+)\/(?:[^\/]+\/)?((?:id)\d+).*$/i,replace:'https://itunes.apple.com/cn/$1/$2'},'apps.apple.com':{testReg:/^http(?:s)?:\/\/apps\.apple\.com\/(?:\w{2}\/)?([^\/]+)\/(?:[^\/]+\/)?((?:id)\d+).*$/i,replace:'https://apps.apple.com/cn/$1/$2'},'microsoft.com/win10-store':{testReg:/^http(?:s)?:\/\/www\.microsoft\.com\/[a-zA-Z-]{2,5}\/p\/[\w-]+\/([a-zA-Z0-9]{12,})(?:[^a-zA-Z0-9].*|$)/i,replace:'https://www.microsoft.com/store/apps/$1'},'chrome.google.com/webstore':{testReg:/^http(?:s)?:\/\/chrome\.google\.com\/webstore\/detail\/[^\/]+\/([a-z]{32}).*/i,replace:'https://chrome.google.com/webstore/detail/$1'},'s.taobao.com':{testReg:/^http(?:s)?:\/\/s\.taobao\.com\/search.*$/i,replace:'https://s.taobao.com/search',query:['q']},'list.tmall.com':{testReg:/^http(?:s)?:\/\/list\.tmall\.com\/search_product\.htm.*$/i,replace:'https://list.tmall.com/search_product.htm',query:['q']},'item.taobao.com':{testReg:/^http(?:s)?:\/\/item\.taobao\.com\/item\.htm.*$/i,replace:'https://item.taobao.com/item.htm',query:['id']},'detail.tmall.com':{testReg:/^http(?:s)?:\/\/detail\.tmall\.com\/item\.htm.*$/i,replace:'https://detail.tmall.com/item.htm',query:['id']},'taobao/tmall.com/shop':{testReg:/^http(?:s)?:\/\/(\w+)\.(taobao|tmall)\.com\/shop\/view_shop\.htm.*$/i,replace:'https://$1.$2.com/'},'c.pc.qq.com':{testReg:/^http(?:s)?:\/\/c\.pc\.qq\.com\/middle.html\?.*pfurl=([^&]*)(?:&.*$|$)/i,replace:'$1',query:[],methods:['decodeUrl']},'item.m.jd.com':{testReg:/^http(?:s)?:\/\/item\.m\.jd\.com\/product\/(\d+)\.html(\?.*)?$/i,replace:'https://item.jd.com/$1.html'},'item.m.jd.com/ware/':{testReg:/^http(?:s)?:\/\/item\.m\.jd\.com\/ware\/view\.action\?.*wareId=(\d+).*$/i,replace:'https://item.jd.com/$1.html'},'search.jd.com':{testReg:/^http(?:s)?:\/\/search\.jd\.com\/Search\?.*$/i,query:['keyword','enc']},'re.jd.com':{testReg:/^http(?:s)?:\/\/re\.jd\.com\/cps\/item\/(\d+)\.html.*$/i,replace:'https://item.jd.com/$1.html'},'weibo.com/u':{testReg:/^http(?:s)?:\/\/(?:www\.)?weibo\.com\/u\/(\d+)(\?.*)?$/i,replace:'https://m.weibo.cn/$1'},'weibo.com':{testReg:/^http(?:s)?:\/\/(?:www\.)?weibo\.com\/(?:\d+)\/(\w+)(\?.*)?$/i,replace:'https://m.weibo.cn/status/$1'},'greasyfork.org/script/tabs':{testReg:/^http(?:s)?:\/\/(?:www\.)?greasyfork\.org\/(?:[\w-]*\/)?scripts\/(\d+)-[^//]*\/(code|versions|stats|derivatives|admin).*$/i,replace:'https://greasyfork.org/scripts/$1/$2',hash:!0},'greasyfork.org':{testReg:/^http(?:s)?:\/\/(?:www\.)?greasyfork\.org\/(?:[\w-]*\/)?(scripts|users)\/(\d+)-[^//]*$/i,replace:'https://greasyfork.org/$1/$2'},'greasyfork.org/scripts/list':{testReg:/^http(?:s)?:\/\/(?:www\.)?greasyfork\.org\/(?:[\w-]*\/)?scripts\?.*$/i,query:['set','page']},'greasyfork.org/script/discussions':{testReg:/^http(?:s)?:\/\/(?:www\.)?greasyfork\.org\/(?:[\w-]*\/)?scripts\/(\d+)-[^//]*\/discussions\/(\d+).*$/i,replace:'https://greasyfork.org/scripts/$1/discussions/$2',hash:!0},'greasyfork.org/discussions':{testReg:/^http(?:s)?:\/\/(?:www\.)?greasyfork\.org\/(?:[\w-]*\/)?discussions\/(greasyfork|development|requests)\/(\d+)(?:[^\d].*)?$/i,replace:'https://greasyfork.org/discussions/$1/$2',hash:!0},'store.steampowered.com|steamcommunity.com':{testReg:/^http(?:s)?:\/\/(store\.steampowered|steamcommunity)\.com\/app\/(\d+).*$/i,replace:'https://$1.com/app/$2'},'meta.appinn.com':{testReg:/^http(?:s)?:\/\/meta\.appinn\.net\/t(?:\/[^/]*)*?\/(\d+)(\/.*$|$)/i,replace:'https://meta.appinn.net/t/$1'},'amazon.co.jp':{testReg:/^http(?:s)?:\/\/(?:www\.)?amazon\.co\.jp\/([^\/]+)\/dp\/(\w+)\/.*$/i,replace:'https://www.amazon.co.jp/$1/dp/$2'},'yangkeduo.com':{testReg:/^http(?:s)?:\/\/mobile\.yangkeduo\.com\/goods.html\?.*$/i,query:['goods_id']},other:{testReg:/^(http(?:s)?:\/\/[^?#]*)[?#].*$/i,query:['id','tid','uid','q','wd','query','keyword']}};const pureUrl=function(url=window.location.href){const hash=url.replace(/^[^#]*(#.*)?$/,'$1'),base=url.replace(/(\?|#).*$/,'');let pureUrl=url;const getQueryString=function(key){let ret=url.match(new RegExp('(?:\\?|&)('+key+'=[^?#&]*)','i'));return null===ret?'':ret[1]},methods={decodeUrl:function(url){return decodeURIComponent(url)}};for(let i in rules){let rule=rules[i],reg=rule.testReg,replace=rule.replace;if(reg.test(url)){let newQuerys='';void 0!==rule.query&&rule.query.length>0&&rule.query.map(query=>{const ret=getQueryString(query);''!==ret&&(newQuerys+=(newQuerys.length?'&':'?')+ret)}),newQuerys+=void 0!==rule.hash&&rule.hash?hash:'',pureUrl=(void 0===replace?base:url.replace(reg,replace))+newQuerys,void 0!==rule.methods&&rule.methods.length>0&&rule.methods.map(methodName=>{pureUrl=methods[methodName](pureUrl)});break}}return pureUrl}();let newnode=document.createElement('input');newnode.id='pure-url-for-copy',newnode.value=pureUrl,document.body.appendChild(newnode);let copyinput=document.getElementById('pure-url-for-copy');copyinput.select();try{document.execCommand('copy');window.location.href===pureUrl?window.location.reload():window.location.href=pureUrl}catch(err){null!=prompt('净化后的网址是：',pureUrl)&&(window.location.href=pureUrl)}document.body.removeChild(copyinput)})();