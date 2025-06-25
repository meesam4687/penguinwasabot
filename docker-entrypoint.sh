#!/bin/bash

echo "Starting Lavalink..."
java -jar /app/lavalink/Lavalink.jar &
sleep 60
echo "Starting Node..."
nvm use 22
node index.js

wait
