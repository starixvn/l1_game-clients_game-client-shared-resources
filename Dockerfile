FROM hub.lumigame.com/base/nginx:brotli-1.20.2-zlib

COPY ./.nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./resources /usr/share/nginx/html/