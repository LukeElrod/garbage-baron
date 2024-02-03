FROM node:21.6.1

COPY package*.json ./
RUN npm ci
COPY index.js ./

CMD ["node", "index.js"]