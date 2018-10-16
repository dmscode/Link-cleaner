链接地址洗白白 Greasemonkey 版
===

文件说明：
---

```
.
├── Greasemonkey  \\ 油猴脚本目录
│   ├── dist  \\ 脚本生成文件夹
│   │   └── Link-Cleaner.user.js
│   ├── DOM.html  \\ 脚本在页面中追加的元素内容
│   ├── images  \\ 图片资源
│   │   ├── AliPay-360.png
│   │   ├── QQPay-360.png
│   │   └── WePay-360.png
│   ├── merge-files.js \\ 文件合并工具
│   ├── readme.md \\ 本文件
│   └── Script.js \\ 脚本部分
├── logo.png  \\ 图标
└── Main.js \\ 主功能函数，全项目共用
```

关于合并工具（merge-files.js）：
---

* 读取 DOM.html
* 将其中涉及的 png 格式图片资源转换为 base64 格式
* 将 Script.js 中 ` `` ` 替换为上面得出的代码
* 将 Script.js 中 `main.js` 字符串替换成 `Main.js` 文件中的内容。