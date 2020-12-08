FROM node:12.13.0-alpine As development

RUN apk update && apk add build-base git python

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

RUN yarn install --only=development

COPY . .
RUN yarn build 


FROM node:12.13.0-alpine as production

RUN apk update && apk add build-base git python

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn install --production

COPY . .


EXPOSE 8081

ENV PORT 8081
ENV NODE_ENV production
# ENV DEFAULT_URL mongodb://lotus:tj.Vnp*J52w69r_g@172.18.0.2:27017/blogs?authSource=admin
ENV IMAGEDIR=/var/tools/public/images

COPY --from=development /usr/src/app/dist ./dist 

CMD ["node", "dist/index"]
