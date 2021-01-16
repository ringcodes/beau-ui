FROM lsl200817-docker.pkg.coding.net/beaueau/base/node-nginx:1.0
MAINTAINER xx
WORKDIR /opt/app
COPY ./dist /opt/app/dist/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]