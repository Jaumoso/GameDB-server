# syntax=docker/dockerfile:1
FROM node:18.18 AS build
WORKDIR /usr/src/app/
COPY package*.json ./
# Use Yarn for package installation
RUN --mount=type=cache,target=/usr/src/app/.yarn yarn install --frozen-lockfile
COPY ./dist .
# Use Yarn for building the project
RUN --mount=type=cache,target=/usr/src/app/.yarn yarn run build:prod
FROM nginx:latest
COPY --from=build /usr/src/app/dist/client /usr/share/nginx/html
EXPOSE 80 443