FROM node:18

RUN apt-get update && \
    apt-get install -y ffmpeg openvpn && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .


EXPOSE 8000

CMD node index.js
