FROM node:18-alpine
WORKDIR /app
# Install Python 3 and create a symbolic link for `python`
RUN apk add --no-cache python3 && ln -sf python3 /usr/bin/python
# Install Java
RUN apk add --no-cache openjdk11
RUN apk update && apk add --no-cache g++
COPY package*.json .
RUN npm i
COPY . .
EXPOSE 5000
CMD [ "node","index.js" ]