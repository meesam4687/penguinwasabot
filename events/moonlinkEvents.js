const Discord = require('discord.js');

module.exports = (client) => {
  client.on('raw', (packet) => {
    client.moonlinkManager.packetUpdate(packet);
  });

  client.moonlinkManager.on('nodeConnect', (node) => {
    console.log(`Node ${node.identifier} connected`);
  });

  client.moonlinkManager.on('nodeDisconnect', (node) => {
    console.log(`Node ${node.identifier} disconnected`);
  });

  client.moonlinkManager.on('nodeError', (node, error) => {
    console.error(`Node ${node.identifier} encountered an error:`, error);
  });

  client.moonlinkManager.on('trackStart', (player, track) => {
    const channel = client.channels.cache.get(player.textChannelId);
    if (channel) {
      channel.send(`Now playing: **${track.title}**`);
    }
  });

  client.moonlinkManager.on('queueEnd', (player) => {
    setTimeout(() => {
      if (!player.playing && player.queue.size === 0) {
        player.destroy();
      }
    }, 30000);
  });
};
