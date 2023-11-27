FROM node:18-alpine AS build
WORKDIR /app
RUN npm i -g pnpm husky
COPY .npmrc package.json pnpm-lock.yaml ./
RUN pnpm i --frozen-lockfile
COPY . .
RUN pnpm build
RUN pnpm prune --prod

FROM gcr.io/distroless/nodejs:18
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist/ ./dist/
EXPOSE 3000
ENV NODE_PORT 3000
ENV NODE_ENV production
CMD [ "dist/main.js" ]
