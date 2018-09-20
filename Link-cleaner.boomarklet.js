javascript: (function () {
  var dms_bookmarklet_version = 0.3;
  /* 引入规则脚本 */
  let script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://rawgit.com/dmscode/Link-cleaner/master/Link-cleaner-release.js';
  document.body.appendChild(script);
  /* 等待脚本加载完成并运行 */
  window.setInterval(function(){
    if(typeof(dms_get_pure_url) === 'function'){
      window.clearInterval();
      dms_get_pure_url();
    }
  }, 300);
})();