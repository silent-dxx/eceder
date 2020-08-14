# Eceder

一款基于Election术开发的一款Windows动态桌面应用，可以把动态图形界面嵌入到桌面的下面，嵌入之后并不会影响桌面的正常使用。被设置为桌面背景的对象可以是Web页面、视频文件播放、动态或静态图片、图形可执行程序(未完成)等。

## 主界面

![main](/show/main.png)



## 运行状态图

![gif_show](/show/gif_show.gif)

# 环境构建

安装 electron

```shell
npm install -g electron
```

淘宝 NPM 镜像

```shell
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

安装其它工具

```shell
cnpm install -g asar -packager electron-rebuild node-gyp prebuild
```

安装项目的库

```shell
npm install --save-dev
```

编译node原生库

```shell
HOME=~/.electron-gyp node-gyp rebuild --target=1.8.2 --arch=x64 --dist-url=https://atom.io/download/atom-shell
```

执行程序

```shell
npm start
```

打包

```shell
npm run build:win64
```

