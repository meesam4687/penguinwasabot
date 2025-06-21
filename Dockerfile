FROM node:22

RUN apt-get update && \
    apt-get install -y ffmpeg curl openjdk-17-jre && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

RUN mkdir -p /app/lavalink && \
    curl -L -o /app/lavalink/Lavalink.jar https://github.com/lavalink-devs/Lavalink/releases/latest/download/Lavalink.jar

COPY package*.json ./
RUN npm install --build-from-source

COPY . .

COPY docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

EXPOSE 2333 8000

CMD ["/app/docker-entrypoint.sh"]
