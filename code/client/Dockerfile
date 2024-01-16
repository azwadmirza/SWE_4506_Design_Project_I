FROM node:20-alpine as build

RUN npm install -g nodemon

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


EXPOSE 5173

CMD ["npm", "run", "build"]
