javascript: (function () {
  function getQueryString(name) {
    const reg = new RegExp("(^|&)" + name + "=([^&#]*)(&|#|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) return r[2];
    return null;
  }
	const url = window.location.href;
	let pureUrl = url;
  const rulers = [
		/* 0 验证网站，1 保留参数，2 是否保留锚点，3 正则替换规则，4 正则替换内容 */
		[new RegExp(/^http(s)?:\/\/tools\.appinn\.com\/.*/),[],true,new RegExp(/^http(s)?:\/\/tools\.appinn\.com\//),"https://tools.appinn.com/"],/* 小众工具 */
		[new RegExp(/^http(s)?:\/\/itunes\.apple\.com\/.*/),[],false,new RegExp(/^http(s)?:\/\/itunes\.apple\.com\/(\w{2}\/)?([^\/]+)\/([^\/]+\/)?(id\d+).*/),"https://itunes.apple.com/cn/$3/$5"],/* Apple Stroe */
		[new RegExp(/^http(s)?:\/\/chrome\.google\.com\/webstore\/detail\/.*/),[],false,new RegExp(/^http(s)?:\/\/chrome\.google\.com\/webstore\/detail\/[^\/]+\/([a-z]{32}).*/),"https://chrome.google.com/webstore/detail/$2"],/* Chrome Store */
		[new RegExp(/^http(s)?:\/\/s\.taobao\.com\/search.*/),["q"],false,new RegExp(/^http(s)?:\/\/s\.taobao\.com\/search.*/),"https://s.taobao.com/search"],/* Taobao Search */
		[new RegExp(/^http(s)?:\/\/list\.tmall\.com\/search_product\.htm.*/),["q"],false,new RegExp(/^http(s)?:\/\/list\.tmall\.com\/search_product\.htm.*/),"https://list.tmall.com/search_product.htm"],/* Tmall Search */
		[new RegExp(/^http(s)?:\/\/item\.taobao\.com\/item\.htm.*/),["id"],false,new RegExp(/^http(s)?:\/\/item\.taobao\.com\/item\.htm.*/),"https://item.taobao.com/item.htm"],/* Taobao item */
		[new RegExp(/^http(s)?:\/\/detail\.tmall\.com\/item\.htm.*/),["id"],false,new RegExp(/^http(s)?:\/\/detail\.tmall\.com\/item\.htm.*/),"https://detail.tmall.com/item.htm"],/* Tmall item */
		[new RegExp(/^http(s)?:\/\/\w+\.(taobao|tmall)\.com\/shop\/view_shop\.htm.*/),[],false,new RegExp(/^http(s)?:\/\/(\w+)\.(taobao|tmall)\.com\/shop\/view_shop\.htm.*/),"https://$2.$3.com/"],/* Taobao/Tmall Shop */
		[new RegExp(/^http(s)?:\/\/item\.m\.jd\.com\/product\/(\d+)\.html(\?.*)?/),[],false,new RegExp(/^http(s)?:\/\/item\.m\.jd\.com\/product\/(\d+)\.html(\?.*)?/),"https://item.jd.com/$2.html"],/* JD mobile to PC */
		[new RegExp(/^http(s)?:\/\/(www\.)?greasyfork\.org\/([\w-]*\/)?scripts\/\d+-.*/),[],false,new RegExp(/^http(s)?:\/\/(www\.)?greasyfork\.org\/([\w-]*\/)?scripts\/(\d+)-.*/),"https://greasyfork.org/zh-CN/scripts/$4"],/* Greasyfork Script */
		[new RegExp(/^http(s)?:\/\/.*/),["id","tid","uid","q","wd","query"],false,new RegExp(/^(http(s)?:\/\/[^?#]*)[?#].*/),"$1"],/* All url */
	];
	for(var i = 0; i < rulers.length; i++){
    const reg = rulers[i][0];
    if (reg.test(url)) {
			let parameters_name = rulers[i][1];
			let parameters = "";
			for(var j = 0; j < parameters_name.length; j++){
				let parameters_value = getQueryString(parameters_name[j]);
				if(parameters_value != null){
					if(parameters != ""){parameters += "&"}else{parameters += "?"}
					parameters += parameters_name[j] + "=" + parameters_value;
				}
			}
			if(rulers[i][2]){
				parameters += window.location.hash;
			}
			pureUrl = url.replace(window.location.search,"").replace(window.location.hash,"").replace(rulers[i][3],rulers[i][4]) + parameters;
      break;
    }
	}
	let newnode = document.createElement("input");
	newnode.id = "pure-url-for-copy";
	newnode.value = pureUrl;
	document.body.appendChild(newnode);
	let copyinput = document.getElementById("pure-url-for-copy");
  copyinput.select();
  let copyresult = false;
	try {
		copyresult = document.execCommand("copy");
	}catch (err) {
		copyresult = false;
  }
	if(copyresult){
    if(window.location.href === pureUrl){
      window.location.reload();
    }else{
      window.location.href = pureUrl;
    }
	}else{
		document.body.removeChild(copyinput);
		let reload = prompt("净化后的网址是：",pureUrl);
		if(reload != null){
			window.location.href = pureUrl;
		}
	}
})();