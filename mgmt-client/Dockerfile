FROM node:16-alpine

RUN mkdir -p /app
WORKDIR /app

COPY . .

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install --silent --force

RUN npm run build

CMD ["npm", "run", "preview"]