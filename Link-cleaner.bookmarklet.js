javascript: (function () {
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&#]*)(&|#|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return r[2];
        return null;
    }
	var url = window.location.href;
	var pureUrl = url;
    var rulers = [
		/* 0 验证网站，1 保留参数，2 是否保留锚点，3 正则替换规则，4 正则替换内容 */
		[new RegExp(/^http(s)?:\/\/itunes\.apple\.com\/.*/),[],false,new RegExp(/^http(s)?:\/\/itunes\.apple\.com\/(\w{2}\/)?([^\/]+)\/([^\/]+\/)?(id\d+).*/),"https://itunes.apple.com/cn/$3/$5"],/* Apple Stroe */
		[new RegExp(/^http(s)?:\/\/chrome\.google\.com\/webstore\/detail\/.*/),[],false,new RegExp(/^http(s)?:\/\/chrome\.google\.com\/webstore\/detail\/[^\/]+\/([a-z]{32}).*/),"https://chrome.google.com/webstore/detail/$2"],/* Chrome Store */
		[new RegExp(/^http(s)?:\/\/s\.taobao\.com\/search.*/),["q"],false,new RegExp(/^http(s)?:\/\/s\.taobao\.com\/search.*/),"https://s.taobao.com/search"],/* Taobao Search */
		[new RegExp(/^http(s)?:\/\/list\.tmall\.com\/search_product\.htm.*/),["q"],false,new RegExp(/^http(s)?:\/\/list\.tmall\.com\/search_product\.htm.*/),"https://list.tmall.com/search_product.htm"],/* Tmall Search */
		[new RegExp(/^http(s)?:\/\/item\.taobao\.com\/item\.htm.*/),["id"],false,new RegExp(/^http(s)?:\/\/item\.taobao\.com\/item\.htm.*/),"https://item.taobao.com/item.htm"],/* Taobao item */
		[new RegExp(/^http(s)?:\/\/detail\.tmall\.com\/item\.htm.*/),["id"],false,new RegExp(/^http(s)?:\/\/detail\.tmall\.com\/item\.htm.*/),"https://detail.tmall.com/item.htm"],/* Tmall item */
		[new RegExp(/^http(s)?:\/\/\w+\.(taobao|tmall)\.com\/shop\/view_shop\.htm.*/),[],false,new RegExp(/^http(s)?:\/\/(\w+)\.(taobao|tmall)\.com\/shop\/view_shop\.htm.*/),"https://$2.$3.com/"],/* Taobao/Tmall Shop */
		[new RegExp(/^http(s)?:\/\/(www\.)?greasyfork\.org\/([\w-]*\/)?scripts\/\d+-.*/),[],false,new RegExp(/^http(s)?:\/\/(www\.)?greasyfork\.org\/([\w-]*\/)?scripts\/(\d+)-.*/),"https://greasyfork.org/zh-CN/scripts/$4"],/* Greasyfork Script */
		[new RegExp(/^http(s)?:\/\/.*/),["id","tid","uid","q","wd","query"],false,new RegExp(/^(http(s)?:\/\/[^?#]*)[?#].*/),"$1"],/* All url */
	];
	for(var i = 0; i < rulers.length; i++){
        var reg = rulers[i][0];
        if (reg.test(url)) {
			var parameters_name = rulers[i][1];
			var parameters = "";
			for(var j = 0; j < parameters_name.length; j++){
				var parameters_value = getQueryString(parameters_name[j]);
				if(parameters_value != null){
					if(parameters != ""){parameters += "&"}else{parameters += "?"}
					parameters += parameters_name[j] + "=" + parameters_value;
				}
			}
			if(rulers[i][2]){
				parameters += window.location.hash;
			}
			pureUrl = url.replace(rulers[i][3],rulers[i][4]) + parameters;
            break;
        }
	}
	var newnode = document.createElement("input");
	newnode.id = "pure-url-for-copy";
	newnode.value = pureUrl;
	document.body.appendChild(newnode);
	var copyinput = document.getElementById("pure-url-for-copy");
	copyinput.select();
	try {
		var copyresult = document.execCommand('copy');
	}catch (err) {
		var copyresult = false;
	}
	if(copyresult){
		window.location.href = pureUrl;
	}else{
		document.body.removeChild(copyinput);
		var reload = prompt("净化后的网址是：",pureUrl);
		if(reload != null){
			window.location.href = pureUrl;
		}
	}
})();