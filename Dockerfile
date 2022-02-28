FROM node:latest as build

WORKDIR /app

COPY ./package.json /package.json
COPY ./package-lock.json /package-lock.json

RUN npm install

COPY . .

RUN npm run build --production

RUN npm install -g serve

EXPOSE 3000

# use serve in production
# CMD ["npm", "start"]
CMD serve -s build