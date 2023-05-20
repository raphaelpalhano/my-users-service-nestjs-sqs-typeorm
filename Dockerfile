#https://gitlab.fcalatam.com/fca/banco-fidis/ms8/docker-images-base/-/blob/master/Dockerfile.node-18
FROM node:19-slim as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --ignore-scripts

COPY . .

RUN npm run build

#https://gitlab.fcalatam.com/fca/banco-fidis/ms8/docker-images-base/-/blob/master/Dockerfile.node-18
FROM node:19-slim

ENV NODE_ENV=production
ENV PORT=8080  

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --ignore-scripts --only=production

COPY --from=builder /usr/src/app/dist ./dist/

CMD ["sh", "-c", "npm run start:prod"]
