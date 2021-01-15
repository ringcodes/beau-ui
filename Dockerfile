# 基础镜像
FROM node:15.4.0-alpine3.12

WORKDIR /opt/app/beau_admin

# 安装依赖
COPY dist /opt/app/beau_admin
COPY public /opt/app/beau_admin
COPY server /opt/app/beau_admin

# 起服务
# ENTRYPOINT ["/opt/app/beau_admin/server/deploy.sh"]
# 暴露内部端口号
# EXPOSE 5000