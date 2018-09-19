javascript: (function () {
  let script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://cdn.rawgit.com/dmscode/Link-cleaner/master/Link-cleaner-2.2.js';
  document.body.appendChild(script);
  let wait_for_script_load = function (){
    if(typeof(dms_get_pure_url) === 'function'){
      dms_get_pure_url();
    }else{
      window.setTimeout(wait_for_script_load, 100);
    }
  }();
})();