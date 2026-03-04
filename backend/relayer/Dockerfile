FROM node:18-alpine

WORKDIR /app/backend/relayer

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["node", "./index.js"]
