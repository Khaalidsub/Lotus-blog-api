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
RUN mkdir /var/tools/images

COPY package.json .
COPY yarn.lock .
COPY ./src ./src
COPY ./dist ./dist
RUN yarn install --production



EXPOSE 8081
ENV PORT 8081
ENV NODE_ENV production
ENV DEFAULT_URL mongodb://lotus:tj.Vnp*J52w69r_g@172.18.0.3:27017/blogs?authSource=admin
ENV IMAGEDIR=/var/tools/public/images


CMD ["yarn", "start:prod"]
