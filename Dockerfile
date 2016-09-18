FROM node:6-slim
MAINTAINER Gabriel Trabanco Llano <gtrabanco@fwok.org> (https://gabi.uno)

ENV VERSION 0.3.5

RUN groupadd user \
    && useradd --create-home --home-dir /home/user -g user user \
    && apt-get update \
    && apt-get install -y git --no-install-recommends \
    && rm -rf /var/lib/apt/lists/* \

RUN npm install -g dynhost

USER user

CMD ["/usr/bin/dynhost"]