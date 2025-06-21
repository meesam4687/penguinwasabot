#!/bin/bash

echo "Starting Lavalink..."
java -jar /app/lavalink/Lavalink.jar &

echo "Starting Node..."
node index.js

wait
