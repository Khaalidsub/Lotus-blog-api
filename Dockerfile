###############################################################################
###############################################################################
##                      _______ _____ ______ _____                           ##
##                     |__   __/ ____|  ____|  __ \                          ##
##                        | | | (___ | |__  | |  | |                         ##
##                        | |  \___ \|  __| | |  | |                         ##
##                        | |  ____) | |____| |__| |                         ##
##                        |_| |_____/|______|_____/                          ##
##                                                                           ##
## description     : Dockerfile for TsED Application                         ##
## author          : TsED team                                               ##
## date            : 20190820                                                ##
## version         : 1.0                                                     ##
###############################################################################
###############################################################################
FROM node:12.13.0-alpine

RUN apk update && apk add build-base git python

COPY package.json .
COPY yarn.lock .
COPY ./src ./src
COPY ./dist ./dist
RUN yarn install --production
# RUN yarn build



EXPOSE 8081
ENV PORT 8081
ENV NODE_ENV production
ENV DEFAULT_URL mongodb://lotus:tj.Vnp*J52w69r_g@172.18.0.2:27017/blogs?authSource=admin
ENV KEY AKIAIEEHCD4AY4WCCKEA
ENV ACCESS 9e5mPmelryEL30ZnSnE7Yig+u8XVzx0raMXqB126
CMD ["yarn", "start:prod"]
