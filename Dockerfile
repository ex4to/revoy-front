# develop stage
FROM node:lts-alpine as develop-stage
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# build stage
FROM develop-stage as build-stage
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY --from=develop-stage /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8021
CMD ["nginx", "-g", "daemon off;"]
