FROM node:20-alpine as build

RUN npm install -g nodemon

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


EXPOSE 3000

CMD ["npm", "run", "preview"]
