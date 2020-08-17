FROM node:alpine

WORKDIR /app

COPY . .

RUN npm ci

EXPOSE 8080

ENTRYPOINT ["npm", "start"]