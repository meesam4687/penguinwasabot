FROM node:18

# Install necessary packages
RUN apt-get update && \
    apt-get install -y ffmpeg openvpn && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Copy VPN config file
COPY vpn.ovpn /etc/openvpn/config.ovpn

# Expose port
EXPOSE 8000

# Run VPN and then your app
CMD openvpn --config /etc/openvpn/config.ovpn & node index.js
