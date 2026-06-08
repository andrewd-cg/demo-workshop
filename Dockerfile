FROM node:24

WORKDIR /app

COPY package.json ./
RUN npm install --omit=dev

COPY index.js ./

EXPOSE 3000

ENTRYPOINT ["node", "index.js"]
