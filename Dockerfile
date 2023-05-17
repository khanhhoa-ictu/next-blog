FROM node:18-alpine as dependencies

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile




FROM node:18-alpine as builder

WORKDIR /app

COPY . .

COPY --from=dependencies /app/node_modules ./node_modules

RUN yarn build




FROM node:18-alpine as runner

WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/next.config.js ./

COPY --from=builder /app/public ./public

COPY --from=builder /app/.next ./.next

COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/package.json ./package.json




EXPOSE 3000




CMD yarn start -p 3000





# DOCKER_BUILDKIT=1 docker build -t nextjs-base --build-arg BUILDKIT_INLINE_CACHE=1 .

# docker run -d -p 3000:3000 --name nextjs-base-v1 nextjs-base;