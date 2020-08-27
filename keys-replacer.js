/* 初始化文件系统对象，获取当前脚本目录（项目根目录） */
const fs = require('fs')
const filedir = __dirname+'/'

const config = JSON.parse(fs.readFileSync(filedir+'keys-replacer.config.json'))
const main = async ()=>{
  // 生成关键词列表
  const keys = Object.assign(config.keys,
    {
      nowTime:
        new Date().toLocaleDateString().replace(/\//g, '-') +
        ' ' +
        new Date().toString().replace(/^.* (\d+:\d+:\d+) .*$/g, '$1'),
    }
  );
  // 读取对应文件内容
  if(config.fileKeys){
    for await(fileKey of config.fileKeys){
      let fileContent = await fs.readFileSync(filedir+fileKey.file)
      keys[fileKey.key] = fileContent.toString()
    }
  }
  // 读取对应图片内容
  if(config.imgKeys){
    for await(imgkey of config.imgKeys){
      let fileContent = await fs.readFileSync(filedir+imgkey.file)
      keys[imgkey.key] = 'data:image/png;base64,' + fileContent.toString("base64")
    }
  }
  // 文件替换并写入对应位置
  for await(file of config.files){
    let fileContent = await fs.readFileSync(filedir+file.in)
    fileContent = fileContent.toString()
    for(const key in keys){
      const reg = new RegExp('```'+key+'```', 'g')
      fileContent = fileContent.replace(reg, keys[key])
    }
    // 如果代码需要压缩
    if(file.minify){
      const UglifyJS = require("uglify-es")
      const minifyResult = UglifyJS.minify(fileContent, {
        mangle:false,
        output: {
          quote_style: 1
        }
      });
      if(minifyResult.error){
        console.log(minifyResult.error)
      }else{
        fileContent = minifyResult.code
      }
    }
    // 如果是小书签
    if(file.bookmarklet){
      fileContent = fileContent.replace(/\(\);$/, ')();').replace(/^!/, 'javascript:(')
    }
    await fs.writeFile(filedir+file.out,
      fileContent,
      (err) => {
        if (err) {
          return console.error(err);
        }
      })
    console.log('成功处理：'+file.in)
  }
}
main()