**Description**

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

  +为renext和renext的插件提供依赖和核心算法
  +提供一系列的API,包括
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
