FROM node:18-alpine

WORKDIR /app/backend/blockchain

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8545

RUN npx hardhat compile
CMD sh -c "npx hardhat node --port 8545 & sleep 5 && npx hardhat ignition deploy ignition/modules/Greeter.js --network localhost && tail -f /dev/null"
