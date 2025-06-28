const Discord = require("discord.js");
const convert = require("convert-seconds");
module.exports = (client) => {
  client.on("raw", (packet) => {
    client.moonlinkManager.packetUpdate(packet);
  });

  client.moonlinkManager.on("nodeConnect", (node) => {
    console.log(`Node ${node.identifier} connected`);
  });

  client.moonlinkManager.on("nodeDisconnect", (node) => {
    console.log(`Node ${node.identifier} disconnected`);
  });

  client.moonlinkManager.on("nodeError", (node, error) => {
    console.error(`Node ${node.identifier} encountered an error:`, error);
  });

  client.moonlinkManager.on("trackStart", (player, track) => {
    const channel = client.channels.cache.get(player.textChannelId);
    if (channel) {
      const requestor = client.users.cache.get(track.requestedBy.id)
        .username || { username: "Unknown" };
      const playEmbed = new Discord.EmbedBuilder()
        .setTitle(`Now Playing ${track.title} 🎶`)
        .setDescription(
          `⌚ Song Duration: \`${
            convert(Math.floor(track.duration / 1000)).minutes
          }:${convert(Math.floor(track.duration / 1000)).seconds}\``
        )
        .setImage(track.artworkUrl)
        .setTimestamp()
        .setFooter({ text: `Requested by: ${requestor}` });
      const mesgRow = new Discord.ActionRowBuilder().addComponents(
        new Discord.ButtonBuilder()
          .setCustomId("stopbtn")
          .setLabel("⏹️")
          .setStyle(Discord.ButtonStyle.Primary),
        new Discord.ButtonBuilder()
          .setCustomId("pausebtn")
          .setLabel("⏸️")
          .setStyle(Discord.ButtonStyle.Primary),
        new Discord.ButtonBuilder()
          .setCustomId("skpbtn")
          .setLabel("⏩")
          .setStyle(Discord.ButtonStyle.Primary)
      );
      channel.send({ embeds: [playEmbed], components: [mesgRow] });
    }
  });

  client.moonlinkManager.on("queueEnd", (player) => {
    if (!player.playing && player.queue.size === 0) {
      client.filterState = "off";
      player.destroy();
    }
  });
};
