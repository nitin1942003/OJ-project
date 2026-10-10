FROM node:18-alpine
WORKDIR /app
# Install Python 3 and create a symbolic link for `python`
RUN apk add --no-cache python3 && ln -sf python3 /usr/bin/python
# Install the JDK so both javac and java are available to the code runner.
RUN apk add --no-cache openjdk11-jdk
RUN apk update && apk add --no-cache g++
COPY package*.json .
RUN npm i
COPY . .
EXPOSE 5000
CMD [ "node","index.js" ]