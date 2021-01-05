# 基础镜像
FROM node:15.4.0-alpine3.12

WORKDIR /opt/app/beau_admin

# 安装依赖
COPY package.json /opt/app/beau_admin
COPY package-lock.json /opt/app/beau_admin
COPY .npmrc /opt/app/beau_admin
RUN npm install

# 复制源代码
COPY . /opt/app/beau_admin/

# build
RUN npm run build

# 暴露内部端口号
EXPOSE 5000

# 起服务
CMD ["npm", "run", "production"]
