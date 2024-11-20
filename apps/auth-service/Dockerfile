FROM docker.io/node:22.11-alpine

WORKDIR /app

RUN addgroup --system auth-service
RUN adduser --system -G auth-service auth-service

COPY dist/apps/auth-service ./auth-service

COPY ./envs/.auth-service.env ./envs/.auth-service.env

RUN chown -R auth-service:auth-service /app

RUN npm --prefix=auth-service --omit=dev -f install

CMD [ "node", "./auth-service/main.js" ]
