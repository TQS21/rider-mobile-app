FROM node:18-alpine3.14 AS build

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
COPY . ./
RUN npm run build

FROM nginx:latest
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.c
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]