# DEVELOPMENT ENVIRONMENT
FROM node:20 as development

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install glob rimraf
RUN npm install --only=development
RUN npm install tsc-alias
RUN npm install nodemon
COPY . .

#run npm run build

# PRODUCTION ENVIRONMENT
FROM node:20 as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production
RUN npm install tsc-alias

COPY . .
COPY --from=development /usr/src/app/dist ./dist

CMD [ "nodemon", "index.js"]