#  react 初始项目工程

   react项目工程，类似于脚手架，可以用于前期快速开始新项目，综合使用了react技术栈，包括react，redux，react-router，Express结合Webpack的全自动刷新HMR，sass，etc.

## 启动

1. 推荐使用Facebook的yarn来安装

2. 安装运行

        yarn install
        yarn start

3. npm script.

    * `start` 正常启动项目，使用express做后台.
    * `dev:build` 开发过程中，webpack热更新，修改主动构建，是在内存中进行的，如果你想看看生成的具体文件，运行这个script.
    * `dev-hot` 使用webpack自带的Hot module load，不使用自定义的dev-server
    * `production` 生成最终的发布文件

## 可能遇到的问题

- yarn的问题

  - 旧版本的yarn，install的过程，node-sass会一直安装错误，可以使用`npm rebuild node-sass`解决，推荐使用最新版本的yarn v0.21.3。
  - 如果yarn install太慢或者失败，尝试使用国内镜像`yarn config set registry https://registry.npm.taobao.org`

## Preview

 ![example preview](https://github.com/wuyanwuyan/react_project_initial/blob/master/preview/preview.gif)
