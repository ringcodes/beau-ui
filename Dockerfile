FROM lsl200817-docker.pkg.coding.net/beau/base/node-nginx:1.0
MAINTAINER xx
WORKDIR /opt/app
COPY ./dist /opt/app/dist/

CMD ["/bin/sh", "-c", "sed -i \"s@<html@<html data-promise-base-url=\"$API_BASE_URL\"@\" /opt/app/dist/index.html; nginx -g \"daemon off;\""]

EXPOSE 80
