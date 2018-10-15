const fs = require('fs')
const filedir = './'

const readFileContent = function(fileName, isBase64=false){
  let p = filedir + fileName
  let c = fs.readFileSync(p)
  if(isBase64){
    return 'data:image/png;base64,' + c.toString("base64")
  }else{
    return c.toString()
  }
}

let content = readFileContent('Script.js')
let DOMCode = readFileContent('DOM.html')

let imgArray = DOMCode.match(/"images\/[^"]*\.png"/gi)
if(imgArray !== null){
  imgArray.map((imgcode) => {
    let p = imgcode.replace(/"/g, '')
    let code = '"' + readFileContent(p, true) + '"'
    DOMCode = DOMCode.replace(imgcode, code)
  });
}

DOMCode = '`' + DOMCode + '`'
let mainJS = readFileContent('main.js')
content = content.replace(/``/, DOMCode)
content = content.replace(/main\.js/i, mainJS)

fs.writeFile('./dist/Link-Cleaner.user.js',
              content,
              (err) => { 
                if (err) {
                  return console.error(err);
                }
              })
// fs.open('./dist/Link-Cleaner.user.js', "w+", function(err, fd){
//   if (err) {
//       return console.error(err);
//   }
//   fs.writeFile(fd, content, function(err){
//       if (err){
//           return console.error(err);
//       }
//   });
// });