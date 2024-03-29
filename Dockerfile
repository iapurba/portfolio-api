FROM node:18-alpine

WORKDIR /app

COPY . .

RUN yarn global add @nestjs/cli
 
RUN yarn install 

RUN yarn build 

EXPOSE 3001

CMD ["yarn", "start:prod"]