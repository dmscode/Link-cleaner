javascript: (function () {
  var dms_bookmarklet_version = 0.2;
  /* 引入规则脚本 */
  let script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://rawgit.com/dmscode/Link-cleaner/master/Link-cleaner-release.js';
  document.body.appendChild(script);
  /* 等待脚本加载完成并运行 */
  function dms_wait_for_script_load () {
    if(typeof(dms_get_pure_url) === 'function'){
      dms_get_pure_url();
    }else{
      window.setTimeout(dms_wait_for_script_load, 100);
    }
  };
  dms_wait_for_script_load();
})();