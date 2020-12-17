FROM mongo:4.4
ENV MONGO_INITDB_ROOT_USERNAME=lotus
ENV MONGO_INITDB_ROOT_PASSWORD=tj.Vnp*J52w69r_g
RUN mkdir -p /data/db \
    && echo "dbpath = /data/db" > /etc/mongodb.conf

RUN command
VOLUME [ "/data/db" ]


FROM node:12.13.0-alpine As development

RUN apk update && apk add build-base git python


COPY package.json .
COPY yarn.lock .

RUN yarn install --only=development

COPY . .
RUN yarn build 


FROM node:12.13.0-alpine as production

RUN apk update && apk add build-base git python



COPY package.json ./

RUN yarn install --production

COPY . .


EXPOSE 8081

ENV PORT 8081
ENV NODE_ENV production

ENV IMAGEDIR=/var/tools/public/images

COPY --from=development ./dist ./dist 

CMD ["node", "dist/index"]
