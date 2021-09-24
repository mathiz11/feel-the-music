FROM node:latest
WORKDIR api/
COPY package*.json /api/
RUN npm ci
COPY . /api/
EXPOSE 3000
ENTRYPOINT npm start
