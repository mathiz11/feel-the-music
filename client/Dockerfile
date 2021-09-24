FROM node:latest
WORKDIR client/
COPY package*.json /client/
RUN npm ci
COPY . /client/
EXPOSE 3000
ENTRYPOINT npm start
