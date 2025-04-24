FROM node:18-alpine AS base
LABEL maintainer="your-name@example.com"

FROM base AS packages
WORKDIR /hint-frontend
COPY package.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile

FROM base AS builder
WORKDIR /hint-frontend
COPY --from=packages /hint-frontend/node_modules ./node_modules
COPY . .
RUN yarn build

FROM base AS production

RUN yarn global add pm2 \
    && yarn cache clean

WORKDIR /hint-frontend
COPY --from=builder /hint-frontend/public ./public
COPY --from=builder /hint-frontend/.next/standalone ./
COPY --from=builder /hint-frontend/.next/static ./.next/static

COPY docker/pm2.json ./pm2.json
COPY docker/entrypoint.sh ./entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/bin/sh", "./entrypoint.sh"]
