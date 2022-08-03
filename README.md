# 网易云音乐

---

> <font color="pink">若要使用，请务必将服务器部署到自己指定的地方！若无经验，请查看 [后台接口文档](https://neteasecloudmusicapi.vercel.app/#/?id=%e5%ae%89%e8%a3%85) 的教程</font>
>
> <font color="pink">修改 "src/Api/ajax.js" 中第 7 行地址即可</font>

还原网易云音乐 APP，登录后数据与网易云音乐一致

拥有全部基本功能<font color="red">（均为自己编写，因此方法可能不简洁）</font>：

-   播放歌曲，显示歌词，播放时可短暂观察全部歌词，分不同情况改变滚动条滚动
-   下一首，上一首，自动切换歌曲
-   显示歌词时间和总时间，显示进度条
-   歌单歌曲一键添加，单个添加，下一首添加，使用习惯与网易云音乐 APP 一致
-   歌单列表可点击切换，删除单个以及全部歌曲
-   可创建歌单，删除歌单
-   搜索功能，搜索出来的歌曲均能单击播放
-   支持验证码以及二维码登录
-   只有“发现”页能操作歌曲，其他四个界面只展示真实歌曲/歌单数据，并不能操作歌曲/歌单

![Logo](E:\桌面\u=2857826194,255246686&fm=253&fmt=auto&app=120&f=JPEG.jpeg)

## 作者

-   [@Cloudmoon](https://www.github.com/cloudmoonocus)
-   [联系我](f356660222@foxmail.com)

## 技术栈

-   [Vue @3.2.36](https://github.com/vuejs/vue)
-   [Vant @3.49](https://github.com/youzan/vant)
-   [Pinia - 状态管理](https://github.com/vuejs/pinia)
-   [VueRouter - 路由](https://github.com/vuejs/router)
-   [Axios](https://github.com/axios/axios)

## 开发

要部署这个项目，请运行

```bash
npm install
npm run serve
```

## 最终开发的问题

-   二维码登录必须等两三分钟才登陆成功，不是 BUG！！

-   进入部分界面，底部播放器会错位（初次开发，是在开发中学会的，因此后来不知道如何解决刚弄的时候导致的错误了，可能这就是屎山吧哈哈哈）
-   有些歌曲无法播放（未知原因，极少数），就导致停止，无法继续
-   报错 <font color="red">无法连接至服务器</font> 直接刷新即可
-   “发现” 页中 “歌单” 界面进入后短暂卡顿，操作缓慢，因为数据太多，已引入图片懒加载
-   “发现” 页下半部分的 “新碟” 无法显示，未知原因

-   “搜索” 页搜索建议的防抖函数不起作用，未知原因

-   "播客" 页进入全部分类时候警告(无伤大雅)，未知原因
-   使用 Vant 的部分弹出组件，直接滚动到顶部，不知道如何解决

-   为全局点击添加波纹效果，提升用户体验 (Vant 组件库无，directives 文件夹有一个自定义指令，但无作用，未使用)

-   路由返回会造成卡顿 ，目前想到使用 <KeepAlive>，但未编写

## 意见

欢迎大家的意见反馈，相互学习！

请联系我：f356660222@foxmail.com

## 附录

-   免费的后台接口文档：<font color="red"> [网易云音乐 NodeJS 版 API](https://neteasecloudmusicapi.vercel.app/#/) </font>
-   本后端接口部署在 [Vercel](https://vercel.com/)

| 颜色名称       | RGB                 |
| -------------- | ------------------- |
| 网易云音乐红色 | rgb (230, 0, 38)    |
| 全局灰色       | rgb (122, 119, 119) |
