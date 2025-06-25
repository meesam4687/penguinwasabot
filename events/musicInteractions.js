const convert = require("convert-seconds");
const Discord = require("discord.js");

module.exports = {
  name: "interactionCreate",
  once: false,
  async execute(interaction) {
    if (!interaction.isButton()) return;
    let id = interaction.customId;
    let player = interaction.client.moonlinkManager.players.get(
      interaction.guild.id
    );
    if (!player) {
      return interaction.reply({
        content: "There is no music playing in this server.",
        ephemeral: true,
      });
    }
    const track = player.current;
    const requestor = interaction.client.users.cache.get(track.requestedBy.id)
      .username || {
      username: "Unknown",
    };

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
        .setLabel(player.paused ? "▶️" : "⏸️")
        .setStyle(Discord.ButtonStyle.Primary),
      new Discord.ButtonBuilder()
        .setCustomId("skpbtn")
        .setLabel("⏩")
        .setStyle(Discord.ButtonStyle.Primary)
    );

    if (id === "stopbtn") {
      player.destroy();
      return interaction.reply({
        content: "Music playback has been stopped.",
      });
    }

    if (id === "pausebtn") {
      if (player.paused) {
        player.resume();
        mesgRow.components[1].setLabel("⏸️");
        return interaction.update({
          embeds: [playEmbed],
          components: [mesgRow],
        });
      } else {
        player.pause();
        mesgRow.components[1].setLabel("▶️");
        return interaction.update({
          embeds: [playEmbed],
          components: [mesgRow],
        });
      }
    }

    if (id === "skpbtn") {
      if (player.queue.size === 0) {
        player.destroy();
        return interaction.reply({
          content: "Skipped, no more songs in the queue.",
        });
      } else {
        player.skip();
      }
      return interaction.update({
        embeds: [playEmbed],
        components: [mesgRow],
      });
    }
  },
};
