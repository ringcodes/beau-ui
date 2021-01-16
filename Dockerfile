FROM node-nginx
MAINTAINER xx
WORKDIR /opt/app
RUN mkdir /opt/app/logs
COPY ./dist /opt/app/dist/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]