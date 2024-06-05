FROM node:18-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . .

RUN npm rebuild bcrypt

ENV PORT=3000
ENV MONGO_URI=mongodb+srv://jacquemar:o85pxev28Rl0qapG@ConnectDb.mht5fkp.mongodb.net/ConnectDb?retryWrites=true&writeConcern=majority

EXPOSE 3000

CMD ["node", "server"]
