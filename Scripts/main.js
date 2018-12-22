function dms_get_pure_url (url=window.location.href) {
  const hash = url.replace(/^[^#]*(#.*)?$/, '$1')
  const base = url.replace(/(\?|#).*$/, '')
  let pureUrl = url
  const getQueryString = function(key) {
    let ret = url.match(new RegExp('(?:\\?|&)(' + key + '=[^?#&]*)', 'i'))
    return ret === null ? '' : ret[1]
  }
  for(let i in rules){
    let rule = rules[i]
    let reg = rule.testReg
    let replace = rule.replace
    if (reg.test(url)){
      let newQuerys = ''
      rule.query.map((query) => {
        const ret = getQueryString(query)
        if(ret !== ''){
          newQuerys += (newQuerys.length ? '&' : '?') + ret
        }
      })
      newQuerys += rule.hash ? hash : ''
      pureUrl = (replace===''?base:base.replace(reg, replace) ) + newQuerys
      break
    }
  }
  return pureUrl
}