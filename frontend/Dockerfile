FROM node:15.8.0-alpine3.12
WORKDIR /usr/src/app
COPY package*.json ./
RUN ["npm", "install"]
COPY . .
ARG REACT_APP_API_URL
RUN ["npm", "run", "build"]

FROM nginx:latest
WORKDIR /usr/share/nginx/html
COPY frontend.nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /usr/src/app/build .
