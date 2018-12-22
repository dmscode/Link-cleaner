javascript: (function () {
  /** 主功能函数 **/
  {{{Scripts/rules.js}}}
  {{{Scripts/main.js}}}
  const pureUrl = dms_get_pure_url()
  let newnode = document.createElement('input')
  newnode.id = 'pure-url-for-copy'
  newnode.value = pureUrl
  document.body.appendChild(newnode)
  let copyinput = document.getElementById('pure-url-for-copy')
  copyinput.select()
  try {
    let copyresult = document.execCommand('copy')
  if(window.location.href === pureUrl){
    window.location.reload()
  }else{
    window.location.href = pureUrl
  }
  }catch (err) {
  let reload = prompt('净化后的网址是：',pureUrl)
  if (reload != null){
    window.location.href = pureUrl
  }
  }
  document.body.removeChild(copyinput)
})();