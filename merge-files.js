/* 初始化文件系统对象，获取当前脚本目录（项目根目录） */
const fs = require('fs')
const filedir = __dirname+'/'

/**
 * 文件读取函数
 * @param {string} fileName 文件名，含相对路径
 * @param {boolean} isBase64 是否转换为 Base64 编码，默认：否，主要针对二进制文件
 */
const readFileContent = function(fileName, isBase64=false){
  let p = filedir + fileName
  let c = fs.readFileSync(p)
  if(isBase64){
    return 'data:image/png;base64,' + c.toString("base64")
  }else{
    return c.toString()
  }
}
/**
 * 替换 code 中的图片为 Base64 编码
 * @param {string} code 输入的代码
 * @param {string} baseDir 图片文件的文件夹，作为图片地址的调整，最终为相对地址
 */
const imageTo64 = function(code, baseDir){
  let imgArray = code.match(/"images\/[^"]*\.png"/gi)
  if(imgArray !== null){
    imgArray.map((imgcode) => {
      let p = baseDir+imgcode.replace(/"/g, '')
      let c = '"' + readFileContent(p, true) + '"'
      code = code.replace(imgcode, c)
    });
  }
  return code
}
/**
 * 文件打包（拼接）函数
 * @param {*} path 入口文件的地址
 */
const packFiles = function(path){
  /* 需要获取的文件 */
  let content = readFileContent(path)
  let neededFiles = content.match(/{{3}[^}]*}{3}/g)
  /* 获取文件内容 */
  neededFiles.map((fileName) => {
    fileName = fileName.replace(/{|}/g, '')
    let fileCode
    if(fileName.match(/\.png$/) !== null){
      fileCode = readFileContent(fileName, true)
    }else{
      fileCode = readFileContent(fileName)
    }
    let fileRegex = new RegExp('{{{'+fileName.replace(/(\.|\/|\\)/g, '\$1')+'}}}', 'gi')
    if(fileName === 'Greasemonkey/DOM.html'){
      fileCode = imageTo64(fileCode, 'Greasemonkey/')
    }
    content = content.replace(fileRegex, fileCode)
  })
  return content
}
let Greasemonkey = packFiles('Greasemonkey/Script.js')
fs.writeFile(filedir+'dist/Link-Cleaner.user.js',
              Greasemonkey,
              (err) => {
                if (err) {
                  return console.error(err);
                }
              })

/** 小书签的生成 **/
let bookmarklet = packFiles('Bookmarklet/Link-Cleaner.js')
const UglifyJS = require("uglify-es")
bookmarklet = UglifyJS.minify(bookmarklet, {
  mangle:false,
  output: {
    quote_style: 1
  }
});
if(bookmarklet.error !== undefined){
  console.log(bookmarklet.error)
}

let bookmarkletCode = bookmarklet.code.replace(/\(\);$/, ')();').replace(/^!/, 'javascript:(')
fs.writeFile(filedir+'dist/Link-Cleaner.bookmarklet.js',
              bookmarkletCode,
              (err) => {
                if (err) {
                  return console.error(err);
                }
              })
/** 小书签置入说明文档中 **/
let readme = readFileContent('Pages/Readme.md').replace(/{{{theBookmarkletCode}}}/, bookmarkletCode)
fs.writeFile(filedir+'Readme.md',
  readme,
  (err) => {
    if (err) {
      return console.error(err);
    }
  })