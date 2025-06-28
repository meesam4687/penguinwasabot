const convert = require("convert-seconds");
const Discord = require("discord.js");

module.exports = {
  name: "interactionCreate",
  once: false,
  async execute(interaction) {
    try {
      if (!interaction.isButton()) return;
      await interaction.deferReply({ephemeral: true});

      let id = interaction.customId;
      let player = interaction.client.moonlinkManager.players.get(
        interaction.guild.id
      );
      if (!player) {
        return interaction.editReply({
          content: "There is no music playing in this server.",
          ephemeral: true,
        });
      }
      if (interaction.member.voice.channel?.id !== player.voiceChannelId) {
        return interaction.editReply({
          content:
            "You need to be in the same voice channel as the bot to use this command!",
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
        let channel = interaction.guild.channels.cache.get(player.textChannelId);
        if (channel) {
          channel.send({
            content: `${interaction.user} stopped the music.`,
          });
        }
        return interaction.editReply({
          content: `Stopped`,
        });
      }

      if (id === "pausebtn") {
        if (player.paused) {
          player.resume();
          mesgRow.components[1].setLabel("⏸️");
          interaction.message.edit({
            embeds: [playEmbed],
            components: [mesgRow],
          });
          return interaction.editReply({
            content: `Resumed`,
            ephemeral: true,
          });
        } else {
          player.pause();
          mesgRow.components[1].setLabel("▶️");
          interaction.message.edit({
            embeds: [playEmbed],
            components: [mesgRow],
          });
          return interaction.editReply({
            content: `Paused`,
            ephemeral: true,
          });
        }
      }

      if (id === "skpbtn") {
        if (player.queue.size === 0) {
          player.destroy();
        } else {
          player.skip();
        }
        let channel = interaction.guild.channels.cache.get(player.textChannelId);
        if (channel) {
          channel.send({
            content: `${interaction.user} skipped the song.`,
          });
        }
        return interaction.editReply({
          content: `Skipped`,
        });
      }
    } catch (error) {
      console.error("Error in interactionCreate:", error);
    }
  },
};
