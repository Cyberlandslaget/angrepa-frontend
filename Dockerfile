FROM node:16-alpine

RUN mkdir -p /app
WORKDIR /app

COPY package.json .

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install --silent --force

COPY . .

RUN npm run build

CMD ["npm", "run", "preview"]