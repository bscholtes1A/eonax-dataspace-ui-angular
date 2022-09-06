FROM node:lts-alpine as build

WORKDIR /src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginxinc/nginx-unprivileged:latest
# COPY .//nginx.conf /etc/nginx/nginx.confnginx
COPY --from=build /src/app/dist/ng-dataspace-ui /usr/share/nginx/html
