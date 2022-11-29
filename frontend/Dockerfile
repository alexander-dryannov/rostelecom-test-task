FROM node:19-alpine3.15 AS builder
ENV NODE_ENV production
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install --production --network-timeout 600000
COPY . .
RUN yarn build

FROM nginx:1.23.2-alpine AS production
COPY --from=builder /app/build/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]