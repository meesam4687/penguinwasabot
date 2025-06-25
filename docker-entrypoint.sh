#!/bin/bash

echo "Starting Lavalink..."
java -jar /app/lavalink/Lavalink.jar &
sleep 60
echo "Starting Node..."
node index.js

wait
