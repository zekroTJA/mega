FROM node:alpine

COPY . .

RUN npm ci

EXPOSE 8080

ENTRYPOINT ["npm", "start"]