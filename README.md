# React Base
一些自己编写的多功能组件

## 本地运行及编译打包

### `npm start`
本地运行代码 [http://localhost:3000](http://localhost:3000)

### `npm run build`
编译打包到build目录

## 代码目录结构

###src目录如下:
```text
src
├─component         公共通用组件 例如tablepage 通用列表页面
│  └─tablepage
├─images            图片目录
├─layouts           主页面 包括登录页/跳转页/后台页
│  └─component      主页面用到的组件
├─pages             各个页面代码
│  ├─credentials    
│  │  ├─groups
│  │  └─users
│  ├─homepage
│  └─storage
│      ├─disks
│      └─pool
├─route             路由控制模块
├─server            通信模块
└─utils             额外功能
```

