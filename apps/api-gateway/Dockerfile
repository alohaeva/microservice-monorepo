FROM docker.io/node:22.11-alpine

WORKDIR /app

RUN addgroup --system api-gateway
RUN adduser --system -G api-gateway api-gateway

COPY dist/apps/api-gateway ./api-gateway

COPY ./envs/.api-gateway.env ./envs/.api-gateway.env

RUN chown -R api-gateway:api-gateway /app

RUN npm --prefix=api-gateway --omit=dev -f install

CMD [ "node", "./api-gateway/main.js" ]
