FROM node:16
WORKDIR /usr/src/app
COPY . .
WORKDIR /usr/src/app/client/game
RUN npm i
RUN npm run build
WORKDIR /usr/src/app/client/front-office
RUN npm i
RUN npm run build
WORKDIR /usr/src/app/server
RUN npm i
CMD ["npm", "run", "dev"]
