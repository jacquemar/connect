FROM node:18-alpine
RUN apk add --no-cache make gcc g++ python3
WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

RUN npm rebuild bcrypt

ENV PORT=3000
ENV JWT_SECRET=819694f0fbf06e4e3e0b9336ebb9a83e516bc4140e7d95e156235d028f99f909
ENV MONGO_URI=mongodb+srv://jacquemar:o85pxev28Rl0qapG@ConnectDb.mht5fkp.mongodb.net/ConnectDb?retryWrites=true&writeConcern=majority

EXPOSE 3000

CMD ["node", "server"]
