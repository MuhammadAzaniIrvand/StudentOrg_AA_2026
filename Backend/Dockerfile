FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

# Copy semua source code
COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]
