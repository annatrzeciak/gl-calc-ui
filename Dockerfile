FROM node:12.16.2

# Deps required to build deb package
RUN apt update && apt install -y tree rsync

RUN npm install -g @vue/cli

# Prepare working dir
RUN mkdir /ui && chown 1000:1000 /ui
USER "1000"
WORKDIR /ui

ADD src                      /ui/src
ADD public                   /ui/public
ADD package.json             /ui
ADD package-lock.json        /ui
ADD vue.config.js            /ui
ADD .eslintrc.js             /ui

RUN npm install

# Do not use `npm run ...` as it upsets process signaling (CTRL+C etc...)
CMD node_modules/.bin/vue-cli-service serve
