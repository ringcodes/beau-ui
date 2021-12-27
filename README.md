## 简介
Beau是一款基于java开发的轻量级的个人博客、建站、企业文章平台
> 目前所有功能均为个人开发,欢迎各位共同交流,同时如若本项目对您有所帮助,请为它点个star
* 演示站点: [https://www.gz640.cn](https://www.gz640.cn)

## 使用技术
* 基于SpringBoot2.2.5，Mybatis，Mybatis-plus
* 使用beetl模板引擎
* Vue+antd+axios的前后分离的后台管理
* 支持腾讯OSS、七牛云OSS文件存储
* 支持钉钉、github、gitee的登录
* Less样式

## 功能简介
* 设计简洁，界面美观
* 支持[Markdown](https://www.markdownguide.org/)、富文本两种格式编辑文章
* 使用css变量定义主题，简单快捷自定义出各种样式，举例见 主题定义
* 支持友情链接
* 支持附件管理，附件在线预览
* 项目结构清晰，安装部署简单
* 支持首页静态化，首屏秒开

## 安装教程
Docker安装管理后台UI  
   ``` 
   docker pull lsl200817-docker.pkg.coding.net/beau/common/alpine-jre8:1.0  
   ```
   ```
   docker run -d -e ENV=prod lsl:latest
   ```
## 二次开发 
   本地安装好nodejs环境  
   git clone  https://gitee.com/ringcode/beau-ui.git
   yarn  
   yarn start  
   访问http://localhost:9000/

## 学习交流群  
![](https://gitee.com/lsl52640/files/raw/master/contact_me_qr.png)
