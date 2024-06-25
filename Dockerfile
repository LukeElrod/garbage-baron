FROM node:21.6.1

COPY package*.json ./
RUN npm ci
ENV DISCORD_API_KEY ""
ENV OPENAI_API_KEY ""
COPY index.js ./

CMD ["node", "index.js"]