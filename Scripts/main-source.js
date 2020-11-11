/**
 * 主功能代码
 * version ```main-version```
 * update 2020-09-01 07:07:37
 */
function dms_get_pure_url (url=window.location.href) {
  const hash = url.replace(/^[^#]*(#.*)?$/, '$1')
  const base = url.replace(/(\?|#).*$/, '')
  let pureUrl = url
  const getQueryString = function(key) {
    let ret = url.match(new RegExp('(?:\\?|&)(' + key + '=[^?#&]*)', 'i'))
    return ret === null ? '' : ret[1]
  }
  /* 链接处理方法 */
  const methods = {
    decodeUrl: function(url){return decodeURIComponent(url) }
  }
  for(let i in rules){
    let rule = rules[i]
    let reg = rule.testReg
    let replace = rule.replace
    if (reg.test(url)){
      let newQuerys = ''
      if(typeof(rule.query)!=='undefined' && rule.query.length>0){
        rule.query.map((query) => {
          const ret = getQueryString(query)
          if(ret !== ''){
            newQuerys += (newQuerys.length ? '&' : '?') + ret
          }
        })
      }
      newQuerys += typeof(rule.hash)!=='undefined' && rule.hash
                   ? hash
                   : ''
      pureUrl = (typeof(replace)==='undefined'?base:url.replace(reg, replace) ) + newQuerys
      if(typeof(rule.methods)!=='undefined' && rule.methods.length>0){
        rule.methods.map((methodName)=>{
          pureUrl = methods[methodName](pureUrl)
        })
      }
      break
    }
  }
  return pureUrl
}