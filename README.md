**Description**
------
+ **renext**

  这个库提供了:
  + 完整的编译栈
    + ES6
    + JSX
    + LESS
    + CSS modules
    + Flow(可选)
    + Typescript(可选)
    + async/await
    + object-rest-spread
    + regenerator
    + class-properties
    + 更多详见文档

  + 基本的运行时环境
    + 直接编写视图代码,无需编写运行代码(这些代码往往是重复的)
    + 通过配置文件修改运行时行为,比如
      + 路由配置
      + 状态管理配置
    + 更多详见文档

  + 以及以下系统:
    + 视窗和遮罩系统
    + 前端路由系统
    + 路由动画系统
    + 条件持久化存储系统
    + 更多详见文档

+ **renext-core**

  这个库在安装renext时会被一并安装,提供以下能力:
  + 为renext和renext的插件提供依赖和核心算法
  + 提供一系列的API,包括
    + 调用视窗系统
    + 调用遮罩
    + 制作新的窗口组件
    + 路由保护装置
    + 异步流程控制(asyncProcessControl)
    + 动画组件制作器( 符合动画组件规范 )
    + 更多详见文档

+ **renext-creator**

  + 快速构建一个renext工程架构
  + 获得初始编译设置
  + 默认的404页
  + 一些基本的组件

**Usage**
------
**require:**

  * node
  * npm
  * mongodb

**steps:**
  + without renext-creator

  这种方法较为复杂,详见文档

  + with renext-creator
    + npm install renext-creator -g
    + cd 你想要存放代码的目录
    + create-renext-app 你的项目名字
    + cd 你的项目名字

    **至此,你已经得到了renext的全部能力**

    接下来让我们做一些用法说明:
    + npm run server

      这个命令默认在localhost:443端口启动一个https服务
    关于服务器的配置详见文档

    + npm run dev

      打开前端测试服务器,并且前端服务器的所有网络请求会被代理至本机的443端口

      **启动前务必确保服务器正常运行**

      该测试服务器可以动态检测前端代码变化并且自动编译,更新,方便前端开发.

    + npm run build

    制作前端的发布版,发布版拥有许多特性,比如
      + 代码最小化
      + 代码切片
      + 编译时计算( 实验性质 ),以提高运行速度

**renext项目编写指南**

  以下所有指南基于 **renext-creator** 创建的工程架构

  /
  + /public

    这里是网站对外发布的资源,应当包括:
    + index.html(已包含)
    + vendor.js(已包含)
    + common.js(已包含)
    + entry.js(已包含)
    + /static
      + /js

        这里是各个页面(不含入口页)的代码

      + /images

        这里是网站用到的图片资源.(CDN架构正在研发中)

  + /src

    这里是网站源代码

    + /Frontend

      这里是前端代码

      + /Animation

        这里存放所有的动画组件

      + /Connected

        这里存放所有的Connected组件 -- 关于Connected规范见文档

      + /UI

        这里存放所有的UI组件 -- 关于UI规范见文档

      + /Page

        这里存放所有的Page组件 -- 关于Page规范见文档

      + /Windows

        这里存放所有的Window组件 -- 关于Window规范见文档

      + /Wrapper

        这里存放所有的Wrapper组件 -- 关于Wrapper规范见文档

      + /HOC

        这里存放所有的高阶组件

    + /Server

      这里是服务器代码

    + /Algorithm

      这里存放整个项目用到的算法

    + /DataStructure

      这里存放整个项目用到的数据结构
