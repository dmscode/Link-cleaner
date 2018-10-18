function dms_get_pure_url (url=window.location.href) {
  const hash = url.replace(/^[^#]*(#.*)?$/, '$1')
  const base = url.replace(/(\?|#).*$/, '')
  let pureUrl = url
  function getQueryString(key) {
    let ret = url.match(new RegExp('(?:\\?|&)' + key + '=([^?#&]*)', 'i'))
    return ret === null ? '' : ret[1]
  }
  for(let i in rulers){
    let ruler = rulers[i]
    let reg = ruler.testReg
    let replace = ruler.replace
    if (reg.test(url)){
      let querys = ruler.query
      let newQuerys = ''
      if(querys.length){
        for(let query of querys){
          newQuerys += getQueryString(query) !== ''
          ? (newQuerys.length?'&':'?')+query+'='+getQueryString(query)
          : ''
        }
      }
      newQuerys += ruler.hash ? hash : ''
      pureUrl = (replace===''?base:base.replace(reg, replace) ) + newQuerys
      break
    }
  }
  return pureUrl
}